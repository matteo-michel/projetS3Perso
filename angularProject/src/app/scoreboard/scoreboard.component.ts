import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {FileService} from '../services/file.service';
import {File} from '../class/file';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';

export interface FileElement {
  login: string;
  nodes: number;
  solutions: number;
  fails: number;
  time: number;
}


@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['login', 'nodes', 'solutions', 'fails', 'time'];
  DATA: FileElement[] = [/*{login: 'michelm', nodes: 125, solutions: 250, fails: 2, time: 0.25},
    {login: 'michel', nodes: 125, solutions: 250, fails: 4, time: 0.25}*/];
  dataSource = new MatTableDataSource<FileElement>(this.DATA);
  files: File[] = [];

  constructor(private fileService: FileService) {}

  ngAfterViewInit() {
    console.log(this.DATA);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.fileService.getAllFiles(2).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.setFiles(json);
      },
      error => {},
      () => {
        this.setElement(this.files);
        this.dataSource.data = this.DATA;
      });
  }

  setFiles(data): void {
    for (let i = 0; i < data.length; i++) {
      this.files[i] = this.fileService.getFileFromData(data[i]);
    }
  }

  setElement(data): void {
    data.forEach((s) => {
      this.DATA.push(s.getElementForTable());
    });
  }


}
