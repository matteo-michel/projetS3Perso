export class File {

  public idFile;
  public filePath;
  public login;
  public idSession;
  public performance;
  public nom;

  constructor(idFile, filePath, login, idSession, performance, nom) {
    this.idFile = idFile;
    this.filePath = filePath;
    this.login = login;
    this.idSession = idSession;
    this.performance = performance;
    this.nom = nom;
  }

  public getPerformance(param: string): string {
    const perf = JSON.parse(JSON.stringify(this.performance));
    console.log(perf);
    return perf[param];
  }
}
