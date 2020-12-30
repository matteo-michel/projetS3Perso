import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface FileElement {
  login: string;
  nodes: number;
  solutions: number;
  fails: number;
  time: number;
}

const DATA: FileElement[] = [
  {login: 'michelm', nodes: 125, solutions: 250, fails: 2, time: 0.25},
  {login: 'michel', nodes: 125, solutions: 250, fails: 4, time: 0.25}
];

@Component({
  selector: 'app-table-test',
  templateUrl: './table-test.component.html',
  styleUrls: ['./table-test.component.css']
})
export class TableTestComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['login', 'nodes', 'solutions', 'fails', 'time'];
  dataSource = new MatTableDataSource(DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
