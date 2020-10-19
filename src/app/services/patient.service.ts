import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private _url = 'http://localhost:1337/api/patients';
  constructor(private _http: HttpClient) { }

  addPatient(patient) {
    return this._http.post<any>(this._url + '/add-patient', patient)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  admitPatient(patientDetails) {
    return this._http.post<any>(this._url + '/admit-patient', patientDetails)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  searchPatient(patientId) {
    return this._http.get(this._url + '/search-patient/' + patientId)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  addPrescription(payload) {
    return this._http.post(this._url + '/add-prescription', payload)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  getPrescriptions(patientId) {
    return this._http.get<any>(this._url + '/get-prescription/' + patientId)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  signIn(patient: any) {
    return this._http.post<any>(this._url + '/login', patient)
      .pipe(
        map(res => { return res; }),
        catchError(this.handleError)
      );
  }

  handleError(error: any) {
    if (error instanceof HttpErrorResponse) {
      return throwError(error);
    } else {
      return throwError(error);
    }
  }
}
