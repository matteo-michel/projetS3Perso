import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {File} from '../class/file';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  public getAllFiles(idSession): Observable<any> {
    return this.http.post('/api/files/sessions', {idSession}, this.tokenService.getHttpOption());
  }

  public getFileFromData(data: JSON): File {
    return new File(data['idFile'],data['file'],data['login'],data['idSession'],data['performances'], data['nom']);
  }
}
