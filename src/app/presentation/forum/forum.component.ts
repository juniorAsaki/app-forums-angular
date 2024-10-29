import {Component, OnInit, signal} from '@angular/core';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Forum} from '../../domaine/interfaces/forum.interface';
import {min} from 'rxjs';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-forum',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './forum.component.html',
  styleUrl: './forum.component.scss'
})
export class ForumComponent implements OnInit{

  nbresElements: Array<number> =  Array(8).fill(0);


  formGroup!: FormGroup;
  private forums = environment.endPoint.forums;
  forumsList = signal<Forum[]>([]);

  constructor(private baseService: BaseService , private fb: FormBuilder , private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      title: this.fb.control(null , [Validators.required , Validators.minLength(4)]),
      description: this.fb.control(null , Validators.required)
    })

    this.getAll();
  }

  saveData(){
    this.baseService.create(this.forums.allHttpRequest , this.formGroup.value).subscribe({
      next: (data)=>{
        this.forumsList.update(list => [...list , data])
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getOne(){
    this.baseService.getOne(this.forums.allHttpRequest , this.route.snapshot.params['id'])
  }

  getAll(){
    this.baseService.getAll(this.forums.allHttpRequest).subscribe({
      next: (data) => {
        this.forumsList.set(data);
        console.log(data);
      },
      error: (error) => {
        console.log("Probleme lors du traitement");
      }
    })
  }

  isInvalidaedInput(input: AbstractControl<any>){
    return input.invalid && (input.touched || input.dirty);
  }

  handleSaveForum() {
    if(this.formGroup.valid) this.saveData();
  }

  protected readonly FormControl = FormControl;
}
