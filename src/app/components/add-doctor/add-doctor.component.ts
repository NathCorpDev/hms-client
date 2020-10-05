import { Component, OnInit } from '@angular/core';
import { DoctorService } from 'src/app/services/doctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  addDoctorForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _doctorService: DoctorService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.addDoctorForm = this.fb.group({
      doctorId: ['', Validators.required],
      name: ['', Validators.required],
      highestQualification: ['', Validators.required],
      specialization: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male', Validators.required],
      phoneNo: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    let data = this.addDoctorForm.value;
    console.log(data)
    this._doctorService.addDoctor(data).subscribe(response => {
      this.sendMessageResponse(response['message'], 'successMessage');
      location.reload();
    }, err => {
      console.log(err)
      this.sendMessageResponse(err.error, 'errorMessage');
    })
  }

  sendMessageResponse(message: string, type: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass: type
    });
  }

}
