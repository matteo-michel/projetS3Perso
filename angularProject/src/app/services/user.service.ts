import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {TokenStorageService} from './token-storage.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {}

  public getAll(): Observable<any> {
    return this.http.get('/api/users', httpOptions);
  }

  public getByLogin(login: string): Observable<any> {
    return this.http.get('/api/user/' + login, httpOptions);
  }

  public checkLogin(login: string, password: string): Observable<any> {
    return this.http.post('/api/users/login', {login, pwd: password}, httpOptions);
  }

  public register(login: string, nom: string, prenom: string, password: string, email: string): Observable<any> {
    return this.http.post('/api/users/register', {login, nom, prenom, pwd: password, email}, httpOptions);
  }

  public isAdmin(): Observable<any> {
    return (this.http.post('/api/user/admin', {}, this.tokenService.getHttpOption()));
  }

  public checkAdmin(callback): void {
    this.isAdmin().subscribe(
      data => {
        data.admin === 1 ? callback(1) : callback(0);
      }
    );
  }

  public isAccept(): Observable<any> {
    return (this.http.post('/api/user/accept', {}, this.tokenService.getHttpOption()));
  }

  public setAccept(login: string): Observable<any> {
    return (this.http.post('/api/user/setAccept', {login}, this.tokenService.getHttpOption()));
  }

  public remove(login: string): Observable<any> {
    return (this.http.post('/api/user/remove', {login}, this.tokenService.getHttpOption()));
  }

  public promote(login: string): Observable<any> {
    return (this.http.post('/api/user/promote', {login}, this.tokenService.getHttpOption()));
  }

  public demote(login: string): Observable<any> {
    return (this.http.post('/api/user/demote', {login}, this.tokenService.getHttpOption()));
  }

  public checkAccept(callback): void {
    this.isAdmin().subscribe(
      data => {
        data.isAccept === 1 ? callback(1) : callback(0);
      }
    );
  }

  public registerMail(login: string, nom: string, prenom: string, email: string): Observable<any> {
    return this.http.post('/api/registerMail', {login, nom, prenom, email}, httpOptions);
  }

  public acceptMail(email: string): Observable<any> {
    return this.http.post('/api/acceptMail', {email}, this.tokenService.getHttpOption());
  }

  public refuseMail(email: string): Observable<any> {
    return this.http.post('/api/refuseMail', {email}, this.tokenService.getHttpOption());
  }

}
