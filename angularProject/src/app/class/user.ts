export class User {

  public login: string;
  public nom: string;
  public  prenom: string;
  public password: string;

  constructor(login: string, nom: string, prenom: string, password: string) {
    this.login = login;
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
  }


}
