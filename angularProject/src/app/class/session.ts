import {SessionService} from '../services/session.service';


export class Session {

  public idSession: number;
  public enonce: string;
  public deadline: string;
  public nomSession: string;

  constructor(idSession: number, enonce: string, deadline: string, nomSession: string) {
    this.idSession = idSession;
    this.enonce = enonce;
    this.deadline = deadline;
    this.nomSession = nomSession;
  }

  public static getSessions(sessionService: SessionService): Session[] {
    let s: Session[] = [];
    sessionService.getByLogin(localStorage.getItem('login')).subscribe(
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
      const session = new Session(s['idSession'], s['enonce'], s['deadline'], s['nomSession']);
      sessions.push(session);
    });
    return sessions;
  }


}
