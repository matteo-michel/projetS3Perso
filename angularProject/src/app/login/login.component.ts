import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {User} from '../class/user';
import {Router} from '@angular/router';
import {AppComponent} from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  appComponent: AppComponent = new AppComponent(this.router);
  connected: Boolean = false;
  cookie: String = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('login')) {
      this.cookie = localStorage.getItem('login');
      this.connected = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm): void {
    console.log('sallut login');
    const login = form.value.login;
    const pwd = form.value.password;
    try {
      this.userService.checkLogin(login, pwd).subscribe(
        data => {
          const payload = JSON.parse(atob(data.token.split('.')[1]));
          console.log(payload);
          localStorage.setItem('login', payload.login);
          this.connected = true;
          this.appComponent.isLogin = true;
    },
        err => console.log('Mauvais mot de passe !'),
        () => {
          this.router.navigate(['/']);
        });
    } catch (err) {
    }
  }



}
