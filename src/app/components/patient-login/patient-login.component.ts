import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private _patientService: PatientService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      patientId: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  signIn() {
    let data = this.loginForm.value;
    this._patientService.signIn(data).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        this.router.navigateByUrl('/view-prescription');
      },
      err => { console.log(err) }
    );
  }

}
