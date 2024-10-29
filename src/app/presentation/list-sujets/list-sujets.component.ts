import {Component, OnInit, signal} from '@angular/core';
import {Sujet} from '../../domaine/interfaces/sujet.interface';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-list-sujets',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './list-sujets.component.html',
  styleUrl: './list-sujets.component.scss'
})
export class ListSujetsComponent implements OnInit{

  nbresElements!: Array<number>;

  listSujet = signal<Sujet[]>([])
  sujet = environment.endPoint.subject;

  constructor(private baseService: BaseService , private route: ActivatedRoute , private router: Router) {
  }

  ngOnInit(): void {
    this.nbresElements = Array(8).fill(0);
    this.getAll();
  }

  getAll(){
    let id = this.route.snapshot.params['id'];
    this.baseService.getAllSubjectByForum(this.sujet.getSubjectsByForm , id).subscribe({
      next: data => {
        this.listSujet.set(data)
      },
      error: err => {
        console.error(err)
      }
    })
  }

  handleGoToMessage(idSubject: number) {
    this.router.navigate(['/base/list-message' , idSubject]);
  }
}
