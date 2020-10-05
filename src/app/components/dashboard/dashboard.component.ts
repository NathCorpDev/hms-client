import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  msg;
  constructor(
    private _authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this._authService.dashboard().subscribe(data => {
      console.log(data);
      this.msg = data.message;
    }, err => {
      console.log(err);
      // if (err instanceof HttpErrorResponse) {
      //   if (err.status === 401) this.router.navigateByUrl('/login');
      // }
    })
  }

}
