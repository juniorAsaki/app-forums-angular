import {Component, OnInit, signal} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Forum} from '../../domaine/interfaces/forum.interface';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit{

  formGroup!: FormGroup;
  private forums = environment.endPoint.forums;
  forumsList! :Forum[];

  constructor(private baseService: BaseService , private fb: FormBuilder , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: this.fb.control(null , Validators.required),
      description: this.fb.control(null , Validators.required)
    })

    this.getAll();
  }

  saveData(){
    this.baseService.create(this.forums.create , this.formGroup.value).subscribe({
      next: (data)=>{
        console.log(data)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getOne(){
    this.baseService.getOne(this.forums.getOne , this.route.snapshot.params['id'])
  }

  getAll(){
    this.baseService.getAll(this.forums.getAll).subscribe({
      next: (data) => {
        this.forumsList = data;
        console.log(data);
      },
      error: (error) => {
        console.log("Probleme lors du traitement");
      }
    })
  }

  handleSaveForum() {
    console.log(this.formGroup.value)
    this.saveData();
  }
}
