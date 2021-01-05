import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {TokenStorageService} from '../services/token-storage.service';
import {User} from '../class/user';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  user: User;

  constructor(private userService: UserService, private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getByLogin(this.tokenService.getLogin()).subscribe(
      data => {
        const json = JSON.parse(JSON.stringify(data));
        this.user = new User(json['login'], json['nom'], json['prenom'], json['password'], json['email'], json['isAccept']);
      }
    );
  }

}
