import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../class/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  connected: Boolean = false;
  cookie: String = '';

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    if (localStorage.getItem('login')) {
      this.cookie = localStorage.getItem('login');
      this.connected = true;
    }
  }

  onSubmit(form: NgForm): void {
    const login = form.value.login;
    const pwd = form.value.password;
    try {
      this.userService.checkLogin(login, pwd).subscribe(
        data => {
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          console.log(payload);
          localStorage.setItem('login', payload.login);
          this.connected = true;
    },
        err => console.log('Mauvais mot de passe !'),
        () => {
          console.log('done');
        });
    } catch (err) {
    }
  }



}
