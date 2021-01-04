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
    try {
      this.userService.register(login, nom, prenom, pwd).subscribe(
        data => {
        },
        err => console.log('Le login existe déjà !'),
        () => {
          this.router.navigate(['/login']);
        });
    } catch (err) {
    }
  }

}
