import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent implements OnInit {
  addPatientForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.addPatientForm = this.fb.group({
      patientId: ['', Validators.required],
      name: ['', Validators.required],
      dateAdmitted: ['', Validators.required],
      dateDischarged: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['Male'],
      phoneNo: ['', Validators.required]
    })
  }

  onSubmit() {
    let data = this.addPatientForm.value;

    this._patientService.addPatient(data).subscribe(response => {
      this.sendMessageResponse(response['message'], 'successMessage');
      location.reload();
    }, err => {
      this.sendMessageResponse(err, 'errorMessage');
    })
  }

  sendMessageResponse(message: string, type: string) {
    this._snackBar.open(message, 'Dismiss', {
      duration: 4000,
      panelClass: type
    });
  }

}
