import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {SessionService} from '../services/session.service';
import {Session} from '../class/session';
import {Router} from '@angular/router';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService, SessionService]
})
export class HomeComponent implements OnInit {
  sessionsLoginActual: Session[] = [];
  sessionsLoginOld: Session[] = [];
  sessions: Session[] = [];
  state = 'logged';

  constructor(private userService: UserService, private sessionService: SessionService,
              private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    this.resetComponent();
  }

  createSessionArray(data: any, sessions: Session[]): void {
    data.forEach((s) => {
      const session = new Session(s.idSession, s.enonce, s.deadline, s.nomSession, s.disabled, s.argument);
      sessions.push(session);
    });
  }

  joinSession(idSession): void {
    this.sessionService.join(localStorage.getItem('token'), idSession).subscribe(
      data => {
        this.resetComponent();
      }
    );
  }

  quitSession(idSession): void {
    this.sessionService.quit(this.tokenStorage.getLogin(), idSession).subscribe(
      data => {
        this.resetComponent();
      }
    );
  }

  getSessionLoginOld(): void {
    this.sessionService.getByLoginOld(this.tokenStorage.getLogin()).subscribe(
      data => {
        this.sessionsLoginOld = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsLoginOld);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  getSessionLoginActual(): void {
    this.sessionService.getByLoginActual(this.tokenStorage.getLogin()).subscribe(
      data => {
        this.sessionsLoginActual = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsLoginActual);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  getSessions(): void {
    this.sessionService.getAllAvailable(this.tokenStorage.getLogin()).subscribe(
      data => {
        this.sessions = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessions);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  resetComponent(): void {
    this.sessionsLoginActual = [];
    this.sessionsLoginOld = [];
    this.sessions = [];
    if (this.state === 'outdated'){
      this.getSessionLoginOld();
    }
    else if (this.state === 'logged') {
      this.getSessionLoginActual();
    }
    else if (this.state === 'available'){
      this.getSessions();
    }

 }
  changeState(state: string): void{
    this.state = state;
    this.resetComponent();
  }
}
