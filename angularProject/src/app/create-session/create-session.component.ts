import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AppComponent} from '../app.component';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {
  connected: Boolean = false;
  cookie: String = '';
  isAdmin = 0;
  success = false;

  constructor(private sessionService: SessionService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    this.userService.isAdmin().subscribe(
      (data) => {
          this.isAdmin = data.admin;

      },
      err => {},
      () => {this.testAdmin(this.isAdmin); });
  }

  onSubmit(form: NgForm): void {
    const enonce = form.value.enonce;
    const deadline = form.value.deadline;
    const nomSession = form.value.nomSession;
    const argument = form.value.argument;
    try {
      this.sessionService.addSession(enonce, deadline, nomSession, argument).subscribe(
        data => {
        },
        err => console.log(),
        () => {
          this.success = true;
          form.controls['enonce'].setValue('');
          form.controls['deadline'].setValue('');
          form.controls['nomSession'].setValue('');
          form.controls['argument'].setValue('');
        });
    } catch (err) {
    }
  }

  testAdmin(data): void {
    if (data === 0) {
      this.router.navigate(['/']);
    }
  }

}
