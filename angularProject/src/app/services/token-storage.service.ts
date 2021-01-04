import { Injectable } from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  public static getLoginStatic() {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]))['login'];
  }

  public getLogin() {
    return JSON.parse(atob(localStorage.getItem('token').split('.')[1]))['login'];
  }

  public getHttpOption() {
    return {headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem('token')})};
  }

  public getHeader() {
    return 'Bearer ' + localStorage.getItem('token');
  }

}
