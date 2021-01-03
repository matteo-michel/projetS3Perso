import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';
import * as Highcharts from 'highcharts';
import {FileService} from '../services/file.service';
import {File} from '../class/file';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() session: Session;
  highcharts = Highcharts;
  files: File [];
  chartOptions = {
    chart: {
      type: 'column'
    },
    title: {
      text: '' +
        'Performances des élèves'
    },
    legend : {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
/*      x: 250,
      y: 100,*/
      floating: false,
      borderWidth: 1,

      backgroundColor: (
        (Highcharts.theme) ||
        '#FFFFFF'), shadow: true
    },
    xAxis: {
      categories: [], title: {
        text: null
      }
    },
    yAxis : {
      min: 0,
      title: {
        text: 'Valeurs'
      },
      labels: {
        overflow: 'justify'
      }
    },
    plotOptions : {
      column: {
        dataLabels: {
          enabled: true
        }
      },
      series: {
        stacking: 'normal'
      }
    },
    credits: {
      enabled: false
    },
    series: []
  };
  isUpToBeDisplayed = 0;

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.getAllFilesFromSession(this.session.idSession, (res) => {
      this.files = res;
      this.setGraph();
    });
  }

  setGraph(): void {
    const solutionList = [];
    const nodesList = [];
    const failsList = [];
    const userList = [];
    this.files.forEach((value) => {
      userList.push(value.login);
      const performances  = value.getElementForTable();
      // @ts-ignore
      failsList.push(performances.fails);
      // @ts-ignore
      nodesList.push(performances.nodes);
      // @ts-ignore
      solutionList.push(performances.solutions);
    });
    this.chartOptions.xAxis.categories = userList;
    this.chartOptions.series.push({name: 'Fails', data: failsList});
    this.chartOptions.series.push({name: 'Solutions', data: solutionList});
    this.chartOptions.series.push({name: 'Nodes', data: nodesList});
    this.isUpToBeDisplayed = 1;
  }
}
