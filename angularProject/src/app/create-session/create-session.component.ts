import { Component, OnInit } from '@angular/core';
import {SessionService} from '../services/session.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-session',
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit {

  constructor(private sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    const enonce = form.value.enonce;
    const deadline = form.value.deadline;
    const nomSession = form.value.nomSession;
    try {
      this.sessionService.addSession(enonce, deadline, nomSession).subscribe(
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
