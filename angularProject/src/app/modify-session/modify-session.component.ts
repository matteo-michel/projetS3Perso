import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {Session} from '../class/session';
import {NgForm} from '@angular/forms';
import {SessionService} from '../services/session.service';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-modify-session',
  templateUrl: './modify-session.component.html',
  styleUrls: ['./modify-session.component.css']
})
export class ModifySessionComponent implements OnInit {
  session: Session;
  success = false;

  constructor(private sessionService: SessionService, private userService: UserService,
              private _Activatedroute: ActivatedRoute,
              private _router: Router) { }

  ngOnInit(): void {
    this.sessionService.getSession(parseInt(this._Activatedroute.snapshot.paramMap.get('id'), 10), (res) => {
      this.session = res;
    });
  }

  onSubmit(form: NgForm): void {
    const enonce = form.value.enonce;
    const deadline = form.value.deadline;
    const nomSession = form.value.nomSession;
    const disabled = form.value.disabled;
    const disabledValue = disabled === true ? 1 : 0;
    const argument = form.value.argument;
    try {
      this.sessionService.modifySession(this.session.idSession, enonce, deadline, nomSession, disabledValue, argument).subscribe(
        data => {
        },
        err => console.log(),
        () => {
          this._router.navigate(['/manageSession']);
        });
    } catch (err) {
    }
  }
}
