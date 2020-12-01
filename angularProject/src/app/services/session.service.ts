import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session} from "../class/session";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  sub;
  session: Session[] = [];

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get('/api/sessions', httpOptions);
  }

  public getAllAvailable(login: string): Observable<any> {
    return this.http.get('/api/sessions/available/' + login, httpOptions);
  }

  public getByLogin(login: string): Observable<any> {
    return this.http.get('/api/sessions/' + login, httpOptions);
  }

  public getById(id: number): Observable<any> {
    return this.http.get('/api/session/' + id, httpOptions);
  }


  public quit(login: string, idSession: number): Observable<any> {
    return  this.http.get('/api/sessions/quit/' + login + '&' + idSession, httpOptions);
  }

  public join(login: string, idSession: number): Observable<any> {
    return this.http.get('/api/sessions/join/' + login + '&' + idSession, httpOptions);
  }

  public getSession(id: number): Session {
    this.sub = this.getById(id).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        console.log(json);
        this.session[0] = new Session(json[0]['idSession'], json[0]['enonce'], json[0]['deadline'], json[0]['nomSession']);
      },
      err => console.error(err),
      () => {
        console.log();
        // console.log(this.b);
      });
    return this.session[0];
  }

}
