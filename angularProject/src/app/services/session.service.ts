import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session} from '../class/session';
import {TokenStorageService} from './token-storage.service';
import {delay} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sub;
  session: Session[] = [];

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  public getAll(): Observable<any> {
    return this.http.post('/api/sessions', this.tokenService.getHttpOption());
  }

  public getAllAvailable(login: string): Observable<any> {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.toLocaleTimeString();
    const dateTime = date + ' ' + time;
    return this.http.post('/api/sessions/available', {login, time: dateTime}, this.tokenService.getHttpOption());
  }

  public getByLoginOld(login: string): Observable<any> {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.toLocaleTimeString();
    const dateTime = date + ' ' + time;
    return this.http.post('/api/sessions/outdated', {login, time: dateTime}, this.tokenService.getHttpOption());
  }

  public getByLoginActual(login: string): Observable<any> {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.toLocaleTimeString();
    const dateTime = date + ' ' + time;
    return this.http.post('/api/sessions/actual', {login, time: dateTime}, this.tokenService.getHttpOption());
  }

  public getById(id: number): Observable<any> {
    return this.http.get('/api/session/' + id, this.tokenService.getHttpOption());
  }


  public quit(login: string, idSession: number): Observable<any> {
    return this.http.post('/api/sessions/quit/', {token: login, id: idSession}, this.tokenService.getHttpOption());
  }

  public join(login: string, idSession: number): Observable<any> {
    return this.http.post('/api/sessions/join/', {token: login, id: idSession}, this.tokenService.getHttpOption());
  }

  public getSession(id: number, callback): void {
    this.getById(id).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.session[0] = new Session(json[0].idSession, json[0].enonce, json[0].deadline, json[0].nomSession);
        callback(this.session[0]);
      },
      err => console.error(err)
    );
  }

  public addSession(enonce: string, deadline: string, nomSession: string): Observable<any> {
    return this.http.post('/api/sessions/addSession', {enonce, deadline, nomSession}, this.tokenService.getHttpOption());
  }
}
