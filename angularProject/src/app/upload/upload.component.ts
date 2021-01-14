import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Session} from '../class/session';
import {TokenStorageService} from '../services/token-storage.service';
import { saveAs } from 'file-saver';
import {SessionService} from '../services/session.service';


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
  canUpload = 0;
  argument = '';

  fileInfos: Observable<any>;

  @Input() session: Session;
  @Input() isOutdated: number;
  constructor(private uploadService: UploadFileService, private sessionService: SessionService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.uploadService.canUpload(this.session.idSession, (res) => {
      this.canUpload = res;
    });
    this.fileInfos = this.uploadService.getFilesByID('' + this.session.idSession);
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.canUpload === 1 && this.isOutdated === 0) {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      this.sessionService.getSession(this.session.idSession, (res) => {
        this.argument = res.argument;
        console.log(this.argument);
        this.uploadService.upload(this.currentFile, '' + this.session.idSession, this.argument).subscribe(
          event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.ngOnInit();
            }
          },
          err => {
            this.progress = 0;
            this.message = 'Le fichier n\'a pas pu être envoyé !';
            this.currentFile = undefined;
          });
        this.selectedFiles = undefined;
      });
    }
  }

  deleteFile(name: string): void {
    try {
      if (this.isOutdated === 0){
      this.uploadService.deleteFile( this.session.idSession, name).subscribe(
        data => {},
        err => console.log('la suppréssion du fichier a échoué !'),
        () => {});
      }
    } catch (err) {
    }
    this.ngOnInit();
  }

  downloadFile(name: string): void {
    try {
      this.uploadService.downloadFile(this.session.idSession, name).subscribe(
        data => {
            const blob: any = new Blob([data], {type: 'application/java-archive; charset = utf-8'});
            const url = window.URL.createObjectURL(blob);
            saveAs(blob, name);
          },
        err => console.log('le téléchargement du fichier a échoué !'),
        () => {});
    } catch (err) {}
  }

}
