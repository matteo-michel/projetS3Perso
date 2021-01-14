import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../class/user';
import {log} from "util";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})
export class UserManagerComponent implements OnInit {

  users: User[] = [];


  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      data => {
        data.forEach((u) => {
          const json = JSON.parse(JSON.stringify(u));
          const user = new User(json['login'], json['nom'], json['prenom'], json['password'],
            json['email'], json['isAccept'], json['admin']);
          this.users.push(user);
        });
      }
    );
  }

  denieUser(login: string, email: string): void {
    this.userService.refuseMail(email).subscribe();
    this.userService.remove(login).subscribe();
    this.resetComponent();
  }

  acceptUser(login: string, email: string): void {
    this.userService.acceptMail(email).subscribe();
    this.userService.setAccept(login).subscribe();
    this.resetComponent();
  }

  resetComponent(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = [];
        data.forEach((u) => {
          const json = JSON.parse(JSON.stringify(u));
          const user = new User(json['login'], json['nom'], json['prenom'], json['password'],
            json['email'], json['isAccept'], json['admin']);
          this.users.push(user);
        });
      }
    );
  }

  promote(login: string): void {
    this.userService.promote(login).subscribe();
    this.resetComponent();
  }

  demote(login: string): void {
    this.userService.demote(login).subscribe();
    this.resetComponent();
  }
}
