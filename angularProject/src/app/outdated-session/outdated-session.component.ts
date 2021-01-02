import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';
import {SessionService} from '../services/session.service';

@Component({
  selector: 'app-outdated-session',
  templateUrl: './outdated-session.component.html',
  styleUrls: ['./outdated-session.component.css']
})
export class OutdatedSessionComponent implements OnInit {
  @Input() session: Session;
  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
  }

  /*quitSession(): void {
    this.quit.emit(this.session.idSession);
  }*/

}
