import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../services/token-storage.service';
import {User} from '../class/user';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;
  login: string;
  error: boolean;
  userLogin: string;

  constructor(private userService: UserService, private tokenService: TokenStorageService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userLogin = this.tokenService.getLogin();
    this.login = this.route.snapshot.paramMap.get('login');
    if (!this.login) {
      this.login = this.userLogin;
      this.userService.getByLogin(this.tokenService.getLogin()).subscribe(
        data => {
          const json = JSON.parse(JSON.stringify(data));
          this.user = new User(json['login'], json['nom'], json['prenom'], json['password'], json['email'], json['isAccept'], json['admin']);
        }, error => {
          this.error = true;
        }
      );
    } else {
      this.userService.getByLogin(this.login).subscribe(
        data => {
          const json = JSON.parse(JSON.stringify(data));
          this.user = new User(json['login'], json['nom'], json['prenom'], json['password'], json['email'], json['isAccept'], json['admin']);
        }, error => {
          this.error = true;
        }
      );
    }
  }

}
