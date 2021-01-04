import {SessionService} from '../services/session.service';
import {DatePipe, formatDate} from '@angular/common';


export class Session {

  public idSession: number;
  public enonce: string;
  public deadline: string;
  public nomSession: string;
  public disabled: number;

  constructor(idSession: number, enonce: string, deadline: string, nomSession: string, disabled: number) {
    this.idSession = idSession;
    this.enonce = enonce;
    this.deadline = deadline;
    this.nomSession = nomSession;
    this.disabled = disabled;
  }

  public static getSessions(sessionService: SessionService): Session[] {
    let s: Session[] = [];
    sessionService.getByLoginActual(localStorage.getItem('login')).subscribe(
        data => {
          const json = JSON.parse(JSON.stringify(data));
          s = this.createSessionArray(json);
        },
        err => console.log(err),
        () => {console.log();
      });
    console.log(s);
    return s;
  }

  static createSessionArray(data: any): Session[] {
    let sessions: Session[] = [];
    data.forEach((s) => {
      const session = new Session(s['idSession'], s['enonce'], s['deadline'], s['nomSession'], s['disabled']);
      sessions.push(session);
    });
    return sessions;
  }

  public getSessionDate(): string {
    return formatDate(this.deadline, 'dd/MM/yyyy', 'fr-FR');
  }

  public getSessionHours(): string {
    return formatDate(this.deadline, 'HH:mm:ss', 'fr-FR');
  }


}
