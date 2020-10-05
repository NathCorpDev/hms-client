import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms'

import { PasswordValidation } from 'src/app/helpers/password-validator';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeFrom();
  }

  initializeFrom() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validators: PasswordValidation.MatchPassword
    });
  }

  onSubmit() {
    let data = this.registerForm.value; delete data.confirmPassword;
    this._authService.createUser(data).subscribe(response => {
      console.log(response);
      this.initializeFrom();
      this.registerForm.reset(this.registerForm.value);
    }, err => { console.log(err.error); })
  }


}
