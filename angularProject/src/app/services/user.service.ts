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
    return this.http.get('/api/users/' + login, httpOptions);
  }

  public checkLogin(login: string, password: string): Observable<any> {
    return this.http.post('/api/users/login', {login, pwd: password}, httpOptions);
  }

  public register(login: string, nom: string, prenom: string, password: string): Observable<any> {
    return this.http.post('/api/users/register', {login, nom, prenom, pwd: password}, httpOptions);
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

}
