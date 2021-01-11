import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  connected: Boolean = false;
  cookie: String = '';
  badLogin = false;


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.cookie = localStorage.getItem('token');
      this.connected = true;
      this.router.navigate(['/']);
    }
  }

  onSubmit(form: NgForm): void {
    const login = form.value.login;
    const nom = form.value.nom;
    const prenom = form.value.prenom;
    const pwd = form.value.password;
    const email = form.value.email;
    try {
      this.userService.register(login, nom, prenom, pwd, email).subscribe(
        data => {
        },
        err => {
          this.badLogin = true;
          form.controls['login'].setValue('');
          form.controls['nom'].setValue('');
          form.controls['prenom'].setValue('');
          form.controls['password'].setValue('');
          form.controls['email'].setValue('');
        },
        () => {
          this.router.navigate(['/login']);
        });
    } catch (err) {
    }
    this.userService.registerMail(login, nom, prenom, email).subscribe();
  }

}
