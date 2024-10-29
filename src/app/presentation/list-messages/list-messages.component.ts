import {Component, OnInit, signal} from '@angular/core';
import {Message} from '../../domaine/interfaces/message.interface';
import {environment} from '../../../environments/environment.dev';
import {BaseService} from '../../core/services/base.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-messages',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './list-messages.component.html',
  styleUrl: './list-messages.component.scss'
})
export class ListMessagesComponent implements OnInit{

  listMessage = signal<Message[]>([])
  message = environment.endPoint.message;

  formGroup!: FormGroup;

  constructor(private baseService: BaseService , private route: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.formGroup = new FormGroup({
      content: new FormControl(null , [Validators.required])
    })

    this.getAll();
  }


  getAll(){
    let id = this.route.snapshot.params['id'];
    this.baseService.getAllMessageBySubject(this.message.getMessagesBySubject , id).subscribe({
      next: data => {
        this.listMessage.set(data);
      },
      error: err => {
        console.error(err);
      }
    })
  }

  saveMessage(){

    const formData = this.formGroup.value;

    console.log(formData)

    // Crée l’objet `Subject` avec l’objet `Forum` sélectionné
    const message = {
      content: formData.content,
      subject: {idSubject: this.route.snapshot.params['id']} // sujet complet avec son id
    };

    console.log(message);

    this.baseService.create(this.message.allHttpRequest , message)
      .subscribe({
        next: data => {
          this.listMessage.update(list => [...list , data])
        },
        error: err => {
          console.error(err)
        }
      })
  }



  handleSaveMessage() {
    this.saveMessage();
  }
}
