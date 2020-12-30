import { Component, OnInit } from '@angular/core';
import {FileService} from '../services/file.service';
import {File} from '../class/file';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  files: File[] = [];
  constructor(private fileService: FileService) { }

  ngOnInit(): void {
    this.fileService.getAllFiles(2).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.setFiles(json);
      });
    console.log(this.files.length);
  }

  setFiles(data): void {
    data.forEach((s) => {
      this.files.push(this.fileService.getFileFromData(s));
    });
  }

}
