import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { AddPatientComponent } from './components/add-patient/add-patient.component';
import { AddDoctorComponent } from './components/add-doctor/add-doctor.component';
import { AddPrescriptionComponent } from './components/add-prescription/add-prescription.component';
import { DoctorLoginComponent } from './components/doctor-login/doctor-login.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { ViewPrescriptionComponent } from './components/view-prescription/view-prescription.component';
import { PatientLoginComponent } from './components/patient-login/patient-login.component';
import { AdmitPatientComponent } from './components/admit-patient/admit-patient.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'doctors/login',
    component: DoctorLoginComponent
  },
  {
    path: 'patients/login',
    component: PatientLoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Admin'] }
  },
  {
    path: 'add-patient',
    component: AddPatientComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Admin'] }
  },
  {
    path: 'admit-patient',
    component: AdmitPatientComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Admin'] }
  },
  {
    path: 'add-doctor',
    component: AddDoctorComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Admin'] }
  },
  {
    path: 'add-prescription',
    component: AddPrescriptionComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Doctor'] }
  },
  {
    path: 'view-prescription',
    component: ViewPrescriptionComponent,
    canActivate: [AuthGuard],
    data: { Roles: ['Patient'] }
  },
  {
    path: 'accessdenied',
    component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
