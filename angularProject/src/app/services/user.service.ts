import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  public getAll(): Observable<any> {
    return this.http.get('/api/users', httpOptions);
  }

  public getByLogin(login: string): Observable<any> {
    return this.http.get('/api/users/' + login, httpOptions);
  }

  public checkLogin(login: string, password: string): Observable<any> {
    return this.http.post('/api/users/login', {login, pwd: password}, httpOptions);
  }

}
