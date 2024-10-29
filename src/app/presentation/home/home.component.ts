import {Component, OnInit, signal} from '@angular/core';
import {Forum} from '../../domaine/interfaces/forum.interface';
import {BaseService} from '../../core/services/base.service';
import {environment} from '../../../environments/environment.dev';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  listForum = signal<Forum[]>([]);

  forums = environment.endPoint.forums;

  constructor(private baseService: BaseService , private router: Router) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.baseService.getAll(this.forums.allHttpRequest).subscribe({
      next: (data) => {
        this.listForum.set(data);
        console.log(data);
      },
      error: (error) => {
        console.log("Probleme lors du traitement");
      }
    })
  }

  handleGoToSubject(id: number) {
   this.router.navigate(['/base/list-sujet' , id]);
  }
}
