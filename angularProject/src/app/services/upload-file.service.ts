import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  upload(file: File, idSession: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('idSession', idSession);
    formData.append('token', localStorage.getItem('token'));
    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({'Authorization': this.tokenService.getHeader()})
    });

    return this.http.request(req);
  }

  getFiles(idSession: string): Observable<any> {
      return this.http.post(`/api/files`, {idSession});
  }

}
