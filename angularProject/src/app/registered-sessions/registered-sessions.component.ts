import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Session} from '../class/session';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-registered-sessions',
  templateUrl: './registered-sessions.component.html',
  styleUrls: ['./registered-sessions.component.css']
})
export class RegisteredSessionsComponent implements OnInit {
  @Input() session: Session;
  @Output() quit = new EventEmitter<any>();
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  quitSession(): void {
    this.quit.emit(this.session.idSession);
  }

}
