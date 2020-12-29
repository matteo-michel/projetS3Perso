import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session} from '../class/session';
import {TokenStorageService} from "./token-storage.service";
import {delay} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sub;
  session: Session[] = [];

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  public getAll(): Observable<any> {
    return this.http.get('/api/sessions', this.tokenService.getHttpOption());
  }

  public getAllAvailable(login: string): Observable<any> {
    return this.http.get('/api/sessions/available/' + login, this.tokenService.getHttpOption());
  }

  public getByLogin(login: string): Observable<any> {
    return this.http.get('/api/sessions/' + login, this.tokenService.getHttpOption());
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
        this.session[0] = new Session(json[0]['idSession'], json[0]['enonce'], json[0]['deadline'], json[0]['nomSession']);
        callback(this.session[0]);
      },
      err => console.error(err)
    );
  }

  public addSession(enonce: string, deadline: string, nomSession: string): Observable<any> {
    return this.http.post('/api/sessions/addSession', {enonce, deadline, nomSession}, this.tokenService.getHttpOption());
  }
}
