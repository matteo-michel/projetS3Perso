import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isLogin: Boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('login')) {
      this.isLogin = true;
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout(): void {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }

  isConnected(): boolean {
    if (localStorage.getItem('login')) {
      return true;
    } else { return false; }
  }
}
