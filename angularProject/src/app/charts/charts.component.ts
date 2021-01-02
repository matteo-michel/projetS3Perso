import {Component, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  @Input() session: Session;
  @Input() state: string;
  highcharts = Highcharts;
  chartOptions = {
    chart : {
      plotBorderWidth: null,
      plotShadow: false
    },
    title : {
      text: 'Browser market shares at a specific website, 2014'
    },
    tooltip : {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions : {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme ) ||
              'black'
          }
        }
      }
    },
    series : [{
      type: 'pie',
      name: 'Browser share',
      data: [
        ['Firefox',   45.0],
        ['IE',       26.8],
        {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
        },
        ['Safari',    8.5],
        ['Opera',     6.2],
        ['Others',      0.7]
      ]
    }]
  };
  constructor() { }

  ngOnInit(): void {
  }

}
