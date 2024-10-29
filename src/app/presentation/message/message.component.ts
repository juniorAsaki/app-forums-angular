import {Component, OnInit, signal} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Message} from '../../domaine/interfaces/message.interface';
import {Sujet} from '../../domaine/interfaces/sujet.interface';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent implements OnInit{

  nbresElements: Array<number> =  Array(8).fill(0);
  formGroup !: FormGroup;
  listMessages = signal<Message[]>([]);
  listSubject = signal<Sujet[]>([]);
  private message = environment.endPoint.message;
  private sujet = environment.endPoint.subject;

  constructor(private fb: FormBuilder , private baseService: BaseService) {
  }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      content: this.fb.control(null , Validators.required),
      idSubject: this.fb.control(null , Validators.required)
    })

    this.getAllMessage();
    this.getAllSujet();
  }

  getAllMessage(){
    this.baseService.getAll(this.message.allHttpRequest).subscribe({
      next: (data) => {
        this.listMessages.set(data);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  getAllSujet(){
    this.baseService.getAll(this.sujet.allHttpRequest).subscribe({
      next: (data) => {
        this.listSubject.set(data);
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  saveMessage(){

    const formData = this.formGroup.value;

    console.log(formData)

    // Crée l’objet `Subject` avec l’objet `Forum` sélectionné
    const message = {
      content: formData.content,
      subject: {idSubject: formData.idSubject} // Forum complet avec son id
    };

    console.log(message);

    this.baseService.create(this.message.allHttpRequest , message)
      .subscribe({
        next: data => {
          this.listMessages.update(list => [...list , data])
        },
        error: err => {
          console.error(err)
        }
      })
  }

  handleSave() {
    this.saveMessage();
  }
}
