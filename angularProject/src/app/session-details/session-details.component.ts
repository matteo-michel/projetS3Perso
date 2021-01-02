import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SessionService} from '../services/session.service';
import {Session} from '../class/session';

@Component({
  selector: 'app-session-details',
  templateUrl: './session-details.component.html',
  styleUrls: ['./session-details.component.css']
})
export class SessionDetailsComponent implements OnInit {

  session: Session;
  isOutdated = 1;
  state = 'upload';

  constructor(private _Activatedroute: ActivatedRoute,
              private _router: Router,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getSession(parseInt(this._Activatedroute.snapshot.paramMap.get('id'), 10), (res) => {
      this.session = res;
    });
    this.sessionService.isOutdated(parseInt(this._Activatedroute.snapshot.paramMap.get('id'), 10), (res) => {
      this.isOutdated = res;
    });
  }
  resetComponent(): void {
    if (this.state === 'upload'){
    }
    else if (this.state === 'self') {
    }
    else if (this.state === 'others'){
    }
    this.ngOnInit();
  }
  changeState(state: string): void{
    this.state = state;
    this.resetComponent();
  }

}
