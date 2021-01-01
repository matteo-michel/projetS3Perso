import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Session} from '../class/session';
import {TokenStorageService} from '../services/token-storage.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  progress = 0;
  message = '';

  fileInfos: Observable<any>;

  @Input() session: Session;
  constructor(private uploadService: UploadFileService, private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFilesByID('' + this.session.idSession);
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;

    this.currentFile = this.selectedFiles.item(0);
    this.uploadService.upload(this.currentFile, '' + this.session.idSession).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFilesByID('' + this.session.idSession);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Le fichier n\'a pas pu être envoyé !';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }

  deleteFile(name: string): void {
    try {
      this.uploadService.deleteFile( this.session.idSession, name).subscribe(
        data => {},
        err => console.log('la suppréssion du fichier a échoué !'),
        () => {});
    } catch (err) {
    }
    this.fileInfos = this.uploadService.getFilesByID('' + this.session.idSession);
  }

  downloadFile(name: string): void {
    try {
      this.uploadService.downloadFile(this.session.idSession, name).subscribe(
        data => {
            let blob: any = new Blob([data], {type: 'application/java-archive; charset = utf-8'});
            const url = window.URL.createObjectURL(blob);
            saveAs(blob, name);
          },
        err => console.log('le téléchargement du fichier a échoué !'),
        () => {});
    } catch (err) {}
  }

}
