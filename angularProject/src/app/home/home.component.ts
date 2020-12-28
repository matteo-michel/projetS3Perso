import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {SessionService} from '../services/session.service';
import {User} from '../class/user';
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
  login: string = localStorage.getItem('login');
  users: User[] = [];
  sessionsLogin: Session[] = [];
  sessions: Session[] = [];

  constructor(private userService: UserService, private sessionService: SessionService,
              private router: Router, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['/login']);
    }
    this.userService.getAll().subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.createUsersArray(json);

      },
      err => console.error(err),
      () => {
        console.log();
      });

    this.resetComponent();
  }

  createUsersArray(data: any): void {
    data.forEach((u) => {
      const user: User = new User(u['login'], u['nom'], u['prenom'], u['password']);
      this.users.push(user);
    });
  }

  createSessionArray(data: any, sessions: Session[]): void {
    data.forEach((s) => {
      const session = new Session(s['idSession'], s['enonce'], s['deadline'], s['nomSession']);
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

  getSessionLogin(): void {
    this.sessionService.getByLogin(this.tokenStorage.getLogin()).subscribe(
      data => {
        this.sessionsLogin = [];
        const json = JSON.parse(JSON.stringify(data));
        this.createSessionArray(json, this.sessionsLogin);
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
    this.getSessionLogin();
    this.getSessions();
  }
}
