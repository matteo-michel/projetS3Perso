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
    let perf = JSON.parse(this.performance);
    return perf[param];
  }

  getElementForTable() {
    var result = {};
    result['login'] = this.login;
    result['nodes'] = Number(this.getPerformance("Nodes"));
    result['solutions'] = Number(this.getPerformance("Solutions"));
    result['fails'] = Number(this.getPerformance("Fails"));
    result['time'] = (Number(this.getPerformance("Building time").replace(',', '.')) + Number(this.getPerformance("Resolution time").replace(',', '.'))).toFixed(3);
    return result;
  }
}
