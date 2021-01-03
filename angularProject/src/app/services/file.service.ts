import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {File} from '../class/file';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  file: File;
  files: File[] = [];

  constructor(private http: HttpClient, private tokenService: TokenStorageService) { }

  public getAllFiles(idSession): Observable<any> {
    return this.http.post('/api/files/sessions', {idSession}, this.tokenService.getHttpOption());
  }

  public getFileFromData(data): File {
    return new File(data.idFile, data.file, data.login, data.idSession, data.performances, data.nom);
  }

  public getFileFromSessionLogin(idSession, callback): void {
    const obs = this.http.post('/api/files/sessions/login', {idSession}, this.tokenService.getHttpOption());
    obs.subscribe(
      (data) => {
        try {
          this.file = this.getFileFromData(JSON.parse(JSON.stringify(data[0])));
          callback(this.file);
        } catch (err) {
        }
      }, error => {});
  }

  public getAllFilesFromSession(idSession, callback): void {
    this.getAllFiles(idSession).subscribe(
      (data) => {
        try {
          data.forEach((fileData) => {
            this.files.push(this.getFileFromData(JSON.parse(JSON.stringify(fileData))));
          });
          callback(this.files);
          this.files = [];
        } catch (err) {
        }
      }, error => {});
  }
}
