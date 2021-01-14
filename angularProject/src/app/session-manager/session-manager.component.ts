import { Component, OnInit } from '@angular/core';
import {Session} from '../class/session';
import {UserService} from '../services/user.service';
import {SessionService} from '../services/session.service';
import {TokenStorageService} from '../services/token-storage.service';

@Component({
  selector: 'app-session-manager',
  templateUrl: './session-manager.component.html',
  styleUrls: ['./session-manager.component.css']
})
export class SessionManagerComponent implements OnInit {

  sessionsActive: Session[] = [];
  sessionsEnded: Session[] = [];
  sessionsDisabled: Session[] = [];
  state = 'active';

  constructor(private userService: UserService, private sessionService: SessionService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.resetComponent();
  }

  createSessionArray(data: any, sessions: Session[]): void {
    data.forEach((s) => {
      const session = new Session(s.idSession, s.enonce, s.deadline, s.nomSession, s.disabled, s.argument);
      sessions.push(session);
    });
  }

  getSessionEnded(): void {
    this.sessionService.getEnabled(this.state).subscribe(
      data => {
        this.sessionsEnded = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsEnded);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  getSessionActive(): void {
    this.sessionService.getEnabled(this.state).subscribe(
      data => {
        this.sessionsActive = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsActive);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  getSessionsDisabled(): void {
    this.sessionService.getDisabled().subscribe(
      data => {
        this.sessionsDisabled = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsDisabled);
      },
      err => console.log(err),
      () => {
        console.log();
      });
  }

  resetComponent(): void {
    this.sessionsEnded = [];
    this.sessionsActive = [];
    this.sessionsDisabled = [];
    if (this.state === 'active'){
      this.getSessionActive();
    }
    else if (this.state === 'ended') {
      this.getSessionEnded();
    }
    else if (this.state === 'disabled'){
      this.getSessionsDisabled();
    }

  }
  changeState(state: string): void{
    this.state = state;
    this.resetComponent();
  }
}
