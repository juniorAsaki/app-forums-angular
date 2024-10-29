import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Sujet} from '../../domaine/interfaces/sujet.interface';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';
import {Forum} from '../../domaine/interfaces/forum.interface';

@Component({
  selector: 'app-suject',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './suject.component.html',
  styleUrl: './suject.component.scss'
})
export class SujectComponent implements OnInit{
  nbresElements: Array<number> =  Array(8).fill(0);

  formGroup!: FormGroup;
  listSubject = signal<Sujet[]>([]);
  listForum = signal<Forum[]>([]);

  sujet = environment.endPoint.subject;
  forum = environment.endPoint.forums;

  constructor(private fb: FormBuilder , private baseService: BaseService) {
  }

  ngOnInit(): void {

    this.getAllForum();
    this.getAllSubject();

    console.log('id ', this.listForum());

    this.formGroup = this.fb.group({
      title: this.fb.control(null , [Validators.required]),
      description: this.fb.control(null , [Validators.required]),
      idForum: this.fb.control(null, [Validators.required])
    })


  }

  getAllSubject(): void{
    this.baseService.getAll(this.sujet.allHttpRequest).subscribe({
      next: (data) => {

        this.listSubject.set(data);
      },
      error: err => {
        console.error(err)
      }
    })
  }

  getAllForum(): void{
    this.baseService.getAll(this.forum.allHttpRequest).subscribe({
      next: (data) => {
        console.log(data);
        this.listForum.set(data);
      },
      error: err => {
        console.error(err)
      }
    })
  }

  saveSubject(){

    const formData = this.formGroup.value;

    console.log(formData);

    // Crée l’objet `Subject` avec l’objet `Forum` sélectionné
    const subject = {
      title: formData.title,
      description: formData.description,
      forum: {idForum: formData.idForum} // Forum complet avec son id
    };

   this.baseService.create(this.sujet.allHttpRequest , subject)
      .subscribe({
        next: data => {
          this.listSubject.update(list => [...list , data])
        },
        error: err => {
          console.error(err)
        }
      })
  }

  handleSaveSubject() {
    this.saveSubject();
  }
}
