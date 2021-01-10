import {Component, OnInit, ViewChild, AfterViewInit, Input} from '@angular/core';
import {FileService} from '../services/file.service';
import {File} from '../class/file';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Session} from "../class/session";
import {ExportExcelService} from "../services/export-excel.service";
import {formatDate} from "@angular/common";

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

  @Input() session: Session;

  displayedColumns: string[] = ['login', 'nodes', 'solutions', 'fails', 'time'];
  DATA: FileElement[] = [];
  dataSource = new MatTableDataSource<FileElement>(this.DATA);
  files: File[] = [];

  constructor(private fileService: FileService, private excelService: ExportExcelService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.fileService.getAllFiles(this.session.idSession).subscribe(
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


  dlExcel(): void {
    const dataForExcel = [];

    this.DATA.forEach((row: any) => {
      dataForExcel.push(Object.values(row));
    });

    const date = formatDate(this.session.deadline, 'dd MMMM', 'fr-FR');

    const reportData = {
      title: this.session.nomSession + ' - ' + date,
      data: dataForExcel,
      headers: Object.keys(this.DATA[0])
    };

    this.excelService.exportExcel(reportData);
  }
}
