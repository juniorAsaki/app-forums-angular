import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private tokenKey: string = 'token_forum';

  constructor() {}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  saveToken(token: string): void{
    localStorage.setItem(this.tokenKey , token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
