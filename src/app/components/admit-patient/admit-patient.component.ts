import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PatientService } from 'src/app/services/patient.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageComponent } from '../message/message.component';
import { SuccessMessageComponent } from '../success-message/success-message.component';

@Component({
  selector: 'app-admit-patient',
  templateUrl: './admit-patient.component.html',
  styleUrls: ['./admit-patient.component.css']
})
export class AdmitPatientComponent implements OnInit {
  patientDetails: FormGroup;
  isEditable = false;
  searchKey: string = '';
  patientFound: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _patientService: PatientService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.patientDetails = this._formBuilder.group({
      patientId: [null],
      patientName: [null],
      gender: [null],
      age: [null, Validators.required],
      address: [null],
      phoneNo: [null],
      dateAdmitted: [null, Validators.required],
      dateDischarged: [null],
      reasonForAdmitting: [null, Validators.required],
      testsPrescribed: [null]
    });
  }

  getPatientDetails() {
    if (this.searchKey != "" || this.searchKey != null) {
      this._patientService.searchPatient(this.searchKey).subscribe(data => {
        console.log(data)
        if (data) {
          this.patientFound = true;
          this.patientDetails.setValue({
            patientId: data['patientId'],
            patientName: data['name'],
            gender: data['gender'],
            age: '',
            address: data['address'],
            phoneNo: data['phoneNo'],
            dateAdmitted: '',
            dateDischarged: '',
            reasonForAdmitting: '',
            testsPrescribed: ''
          });
        } else {
          this.patientFound = false;
        }
      }, err => {
        this.patientFound = false;
        this.sendMessage('Patient with the given PatientId was not found.', 'errorMessage');
      })
    }
  }

  onSubmit() {
    let patientDetails = this.patientDetails.value;
    this._patientService.admitPatient(patientDetails).subscribe(response => {
      this.sendSuccessMessage(response.message, 'successMessage');
      //this.createForm();
      this.patientDetails.reset();
      this.patientDetails.setValue(null)
      // this.patientDetails.markAsUntouched();
      // this.patientDetails.markAsPristine();
    }, err => {
      console.log(err.error);
    })
  }

  sendMessage(message: string, type: string) {
    this._snackBar.openFromComponent(MessageComponent, {
      duration: 5000,
      horizontalPosition: 'left',
      panelClass: 'errorMessage',
      data: message
    });
  }

  sendSuccessMessage(message: string, type: string) {
    this._snackBar.openFromComponent(SuccessMessageComponent, {
      duration: 5000,
      horizontalPosition: 'left',
      panelClass: 'successMessage',
      data: message
    });
  }

}
