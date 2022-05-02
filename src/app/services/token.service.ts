import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  tokenString!: string;
  constructor() { }

  getToken(){
    let token = this.tokenString;
    return token;
  }

  setToken(token: string){
    this.tokenString = token;
  }
}