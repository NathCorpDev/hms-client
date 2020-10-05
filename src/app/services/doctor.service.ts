import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private _url = 'http://localhost:1337/api/doctors';
  constructor(private _http: HttpClient) { }

  addDoctor(doctor) {
    return this._http.post(this._url + '/add', doctor)
      .pipe(
        map(res => { return res }),
        catchError(this.handleError)
      );
  }

  signIn(doctor: any) {
    return this._http.post<any>(this._url + '/login', doctor)
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
