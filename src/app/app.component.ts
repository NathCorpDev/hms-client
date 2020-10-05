import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import jwt_decode from "jwt-decode";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HMS';
  showFiller = false;
  profile: string = null;

  @ViewChild('drawer') sidenav: MatSidenav;

  constructor(
    public _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logOut() {
    this._authService.logOut();
    this.sidenav.close();
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
