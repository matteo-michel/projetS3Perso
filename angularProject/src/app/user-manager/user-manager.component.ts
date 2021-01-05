import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../class/user';

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

  denieUser(login: string): void {
    this.userService.remove(login).subscribe();
    this.resetComponent();
  }

  acceptUser(login: string): void {
    this.userService.setAccept(login).subscribe();
    this.resetComponent();
  }

  resetComponent(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      }
    );
  }
}
