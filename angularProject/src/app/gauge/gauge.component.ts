import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';
import {File} from '../class/file';
import {FileService} from '../services/file.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.css']
})


export class GaugeComponent implements OnInit, AfterViewInit {
  @Input() session: Session;
  file: File;
  performance = {};

  constructor(private fileService: FileService) {}

  ngOnInit(): void {
    this.fileService.getFileFromSessionLogin(this.session.idSession, (res) => {
      this.file = res;
      this.performance = this.file.getElementForTable();
    });
  }

  //set style for gauge
  ngAfterViewInit(): void {
    const divs = document.getElementsByClassName('reading-block');
    for (let i = 0 ; i < divs.length ; i++) {
      divs[i].setAttribute('style', 'transform: translateY(65px); font-size: 44px');
    }
  }

}
