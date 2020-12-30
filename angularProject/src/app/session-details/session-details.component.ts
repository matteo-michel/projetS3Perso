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

  constructor(private _Activatedroute: ActivatedRoute,
              private _router: Router,
              private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.getSession(parseInt(this._Activatedroute.snapshot.paramMap.get('id'), 10), (res) => {
      this.session = res;
    });
  }

}
