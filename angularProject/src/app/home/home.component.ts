import { Component, OnInit } from '@angular/core';
import { Book } from '../class/book';
import {UserService} from '../services/user.service';
import {User} from '../class/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      data => { //console.log(data);
                const json = JSON.parse(JSON.stringify(data));
                // console.log(json);
                // console.log(this.book);
                this.createUsersArray(json);

                // console.log(this.b);
      },
      err => console.error(err),
      () => {console.log('done');
             // console.log(this.b);
      });

  }

  createUsersArray(data: any): void {
    data.forEach((u) => {
      const user: User = new User(u['login'], u['nom'], u['prenom'], u['password']);
      this.users.push(user);
    });
  }

}
