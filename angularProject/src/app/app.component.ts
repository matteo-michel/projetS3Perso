import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogin: Boolean = false;
  isAdmin: Boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isLogin = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isConnected(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    } else { return false; }
  }

}
