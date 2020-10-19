import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ViewPrescriptionComponent } from './components/view-prescription/view-prescription.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AdmitPatientComponent } from './components/admit-patient/admit-patient.component';
import { MessageComponent } from './components/message/message.component';
import { SuccessMessageComponent } from './components/success-message/success-message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddPatientComponent,
    AddDoctorComponent,
    AddPrescriptionComponent,
    DoctorLoginComponent,
    AccessDeniedComponent,
    ViewPrescriptionComponent,
    PatientLoginComponent,
    SideMenuComponent,
    AdmitPatientComponent,
    MessageComponent,
    SuccessMessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  entryComponents: [
    LoginComponent,
    RegisterComponent
  ],
  providers: [AuthService, AuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
