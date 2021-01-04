import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';

@Component({
  selector: 'app-managed-session',
  templateUrl: './managed-session.component.html',
  styleUrls: ['./managed-session.component.css']
})
export class ManagedSessionComponent implements OnInit {
  @Input() session: Session;
  constructor() { }

  ngOnInit(): void {
  }

}
