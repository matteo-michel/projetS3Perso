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
        this.users = data;
      }
    );
  }

}
