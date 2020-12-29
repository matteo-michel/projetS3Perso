import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {UploadFileService} from '../services/upload-file.service';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Session} from "../class/session";

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
  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles('' + this.session.idSession);
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
          this.fileInfos = this.uploadService.getFiles('' + this.session.idSession);
        }
      },
      err => {
        this.progress = 0;
        this.message = 'Le fichier n\'a pas pu être envoyé !';
        this.currentFile = undefined;
      });
    this.selectedFiles = undefined;
  }
}
