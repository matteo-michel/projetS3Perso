export class User {

  public login: string;
  public nom: string;
  public prenom: string;
  public password: string;
  public email: string;
  public isAccept: boolean;

  constructor(login: string, nom: string, prenom: string, password: string, email: string, isAccept: boolean) {
    this.login = login;
    this.nom = nom;
    this.prenom = prenom;
    this.password = password;
    this.email = email;
    this.isAccept = isAccept;
  }


}
