import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { SelfCareHomeComponent } from './self-care-home/self-care-home.component';
// Pages-Components
import { MyStaffAttendanceComponent } from './pages/my-staff-attendance/my-staff-attendance.component'
import { MyStaffAttendeanceReportComponent } from './pages/my-staff-attendeance-report/my-staff-attendeance-report.component';
import { MyStaffAttendanceDetailReportComponent } from './pages/my-staff-attendance-detail-report/my-staff-attendance-detail-report.component';


const selfCareRoutes: Routes = [
  {
    path: 'my-profile', component: SelfCareHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'my-staff-attendance', component: MyStaffAttendanceComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'my-staff-attendance-report', component: MyStaffAttendeanceReportComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'my-staff-attendance-detail-report', component: MyStaffAttendanceDetailReportComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(selfCareRoutes)],
  exports: [RouterModule]
})
export class SelfCareRoutingModule { }
