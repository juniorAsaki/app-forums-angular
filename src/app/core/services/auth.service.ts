import { Injectable } from '@angular/core';
import { LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment.dev';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private httpClient: HttpClient
  ) { }


  isAuthenticated(): boolean{
    return !!this.localStorageService.getToken();
  }

  login(credential: {username: string , password: string}): Observable<any>{

    let options: {headers: HttpHeaders} = {
      headers: new HttpHeaders().set("Context-Type", "application/json")
    }

    let params: HttpParams = new HttpParams().set("username" , credential.username).set("password" , credential.password);

    return this.httpClient.post<{token: string}>(environment.endPoint.login , params , options).pipe(
      map(response => {
        this.localStorageService.saveToken(response.token)
      })
    )
  }

  logout(){
    this.localStorageService.removeToken();
    this.router.navigateByUrl("/login");
  }


}
