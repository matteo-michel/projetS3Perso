import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SessionService} from "../services/session.service";
import {Session} from "../class/session";

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

  sub;

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      const id = params.get('id');
      this.session = this.sessionService.getSession(Number(id));
      console.log(this.session);
    });
  }

  getSession(idSession: number): Session {
    return this.sessionService.getSession(idSession);
  }

}
