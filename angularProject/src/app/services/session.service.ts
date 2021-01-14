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
    return this.http.post('/api/sessions/available', {login}, this.tokenService.getHttpOption());
  }

  public getByLoginOld(login: string): Observable<any> {
    return this.http.post('/api/sessions/outdated', {login}, this.tokenService.getHttpOption());
  }

  public getByLoginActual(login: string): Observable<any> {
    return this.http.post('/api/sessions/actual', {login}, this.tokenService.getHttpOption());
  }

  public getById(id: number): Observable<any> {
    return this.http.get('/api/session/' + id, this.tokenService.getHttpOption());
  }


  public quit(login: string, idSession: number): Observable<any> {
    return this.http.post('/api/sessions/quit', {token: login, id: idSession}, this.tokenService.getHttpOption());
  }

  public join(login: string, idSession: number): Observable<any> {
    return this.http.post('/api/sessions/join', {token: login, id: idSession}, this.tokenService.getHttpOption());
  }

  public getSession(id: number, callback): void {
    this.getById(id).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.session[0] = new Session(json[0].idSession, json[0].enonce, json[0].deadline,
          json[0].nomSession, json[0].disabled, json[0].argument);
        callback(this.session[0]);
      },
      err => console.error(err)
    );
  }

  public isOutdated(id: number, callback): void {
    this.checkDate(id).subscribe(
      data => {
        if (data.length === 0){
          callback(0);
        }
        else { callback(1); }
      },
      err => console.error(err)
    );
  }
  public checkDate(idSession: number): Observable<any> {
    return this.http.post('/api/sessions/checkDate', {id: idSession}, this.tokenService.getHttpOption());
  }

  public addSession(enonce: string, deadline: string, nomSession: string, argument: string): Observable<any> {
    return this.http.post('/api/sessions/addSession', {enonce, deadline, nomSession, argument}, this.tokenService.getHttpOption());
  }

  public getEnabled(state: string): Observable<any> {
    return this.http.post('/api/sessions/manage/enabled', {type: state}, this.tokenService.getHttpOption());
  }

  public getDisabled(): Observable<any> {
    return this.http.post('/api/sessions/manage/disabled', {}, this.tokenService.getHttpOption());
  }

  public modifySession(idSession: number, enonce: string, deadline: string, nomSession: string, disabled: number, argument: string)
    : Observable<any> {
    return this.http.post('/api/sessions/modifySession', {idSession, enonce, deadline, nomSession, disabled, argument},
      this.tokenService.getHttpOption());
  }
}
