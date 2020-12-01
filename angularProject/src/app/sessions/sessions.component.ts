import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Session} from '../class/session';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  @Input() session: Session;
  @Output() join = new EventEmitter<any>();
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  joinSession(): void {
    this.join.emit(this.session.idSession);
  }

}
