import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';

import { PatientService } from 'src/app/services/patient.service';
import jwt_decode from "jwt-decode";
import { ActivatedRoute } from '@angular/router';

const data: any[] = [];

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ViewPrescriptionComponent implements OnInit {
  noDataFound: boolean = false;
  columnsToDisplay: string[] = ['date', 'doctorName'];
  dataSource = data;
  expandedElement: any | null;

  constructor(
    private _patientService: PatientService,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.activatedroute.data.subscribe(data => {
    //   console.log(data.Roles);
    // })

    const token = localStorage.getItem('token');
    const patientId = jwt_decode(token).patientId;

    this._patientService.getPrescriptions(patientId).subscribe(response => {
      this.dataSource = response;
    }, err => { console.log(err.error.message); this.noDataFound = true; });
  }

}
