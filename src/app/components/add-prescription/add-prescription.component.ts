import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from 'src/app/services/patient.service';
import { MatTable } from '@angular/material/table';

export interface MedicinesPrescribed {
  id: number,
  name: string;
  dosage: string;
  noOfDays: string
}

const DATA: MedicinesPrescribed[] = [];


@Component({
  selector: 'app-add-prescription',
  templateUrl: './add-prescription.component.html',
  styleUrls: ['./add-prescription.component.css']
})

export class AddPrescriptionComponent implements OnInit {

  patientId: string = "";
  patientFound: boolean = false;
  patient: any;
  formHasError: boolean = false;
  error_message: string = "";

  displayedColumns: string[] = ['name', 'dosage', 'noOfDays'];

  localdata: MedicinesPrescribed = {
    id: null,
    name: "",
    dosage: "",
    noOfDays: ""
  };

  dataSource = DATA;

  @ViewChild(MatTable, { static: true }) table: MatTable<any>;

  constructor(
    private _patientService: PatientService
  ) { }

  ngOnInit() {
  }

  searchPatient() {
    this._patientService.searchPatient(this.patientId).subscribe(data => {
      this.patient = data;
      this.patientFound = true;
      this.formHasError = false;
      this.error_message = '';
    }, err => {
      this.patientFound = false;
      this.patient = {};
      this.formHasError = true;
      this.error_message = err.error;
    });
  }

  addPrescription() {
    if (this.localdata.name == "" || this.localdata.dosage == "" || this.localdata.noOfDays == "") {
      this.formHasError = true;
      this.error_message = "Inputs cannot be empty! Please enter data to continue...";
      return;
    } else {
      this.formHasError = false;
      this.error_message = "";
    }

    let prescriptions = this.localdata;
    let data = this.dataSource;
    let flag = 0;

    this.clearData();

    if (data.length > 0) {
      for (let row = 0; row < data.length; row++) {
        if (data[row].name == prescriptions.name && data[row].dosage == prescriptions.dosage && data[row].noOfDays == prescriptions.noOfDays) {
          this.formHasError = true;
          this.error_message = "Cannot add duplicate prescriptions! Prescription already exists...";
          flag = 1;
          break;
        }
      }
    }

    if (data.length == 0 || flag == 0) {
      this.formHasError = false;
      this.error_message = "";

      var d = new Date();
      this.dataSource.push({
        id: d.getTime(),
        name: prescriptions.name,
        dosage: prescriptions.dosage,
        noOfDays: prescriptions.noOfDays
      });
      this.table.renderRows();
    }
  }

  savePrescription() {
    let data = this.dataSource;
    for (let i = 0; i < data.length; i++) {
      delete data[i].id;
    }
    let payload = {
      patientId: this.patientId,
      prescription: data
    }

    this._patientService.addPrescription(payload).subscribe(response => {
      this.patientId = "";
      this.patientFound = false;
      this.patient = {};
      this.dataSource = [];
    }, err => {
      console.log(err);
    })
  }

  clearData(): void {
    this.localdata = {
      id: null,
      name: "",
      dosage: "",
      noOfDays: "",
    };
  }

}
