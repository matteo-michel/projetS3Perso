import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';
import {TokenStorageService} from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogin: Boolean = false;
  isAdmin = 0;
  login: string;

  constructor(private router: Router, private userService: UserService, private tokenSercice: TokenStorageService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
      this.login = this.tokenSercice.getLogin();
      this.userService.checkAdmin(res => {
        this.isAdmin = res;
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.login = '';
    this.isAdmin = 0;
  }

  isConnected(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else { return false; }
  }



}
