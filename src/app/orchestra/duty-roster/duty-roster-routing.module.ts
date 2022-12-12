import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { DutyRosterHomeComponent } from './duty-roster-home/duty-roster-home.component';
// Pages-Components
import { DutyrosterHrDashboardComponent } from './pages/dutyroster-hr-dashboard/dutyroster-hr-dashboard.component';
import { DutyrosterHrShiftTemplateComponent } from './pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';
import { DutyrosterHrSapUploadOffshiftComponent } from './pages/dutyroster-hr-sap-upload-offshift/dutyroster-hr-sap-upload-offshift.component';
import { DutyrosterHrSapUploadShiftComponent } from './pages/dutyroster-hr-sap-upload-shift/dutyroster-hr-sap-upload-shift.component';
import { DutyrosterMyDutyrosterComponent } from './pages/dutyroster-my-dutyroster/dutyroster-my-dutyroster.component';
import { DutyrosterSupervisorCreateShiftsComponent } from './pages/dutyroster-supervisor-create-shifts/dutyroster-supervisor-create-shifts.component';
import { DutyrosterHrCreateShiftComponent, } from './pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterCreateShiftsComponent } from './pages/dutyroster-create-shifts/dutyroster-create-shifts.component';
// Pages - Common Components
import { PageLoaderComponent } from './../../common-components/ui/page-loader/page-loader.component';


const DutyRosterRoutes: Routes = [
  {
    path: 'dutyroster', component: DutyRosterHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'hrdashboard', component: DutyrosterHrDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'hrshifttemplate', component: DutyrosterHrShiftTemplateComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'hrshiftsapupload', component: DutyrosterHrSapUploadShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'hroffshiftsapupload', component: DutyrosterHrSapUploadOffshiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'hr-create-shift', component: DutyrosterHrCreateShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'shift', component: DutyrosterSupervisorCreateShiftsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'shift-old', component: DutyrosterCreateShiftsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'myduty', component: DutyrosterMyDutyrosterComponent, canActivate: [AuthGuard], outlet: 'pages' },
      // { path: 'hrapprovals', component: DutyrosterHrApprovalComponent, outlet: 'pages' },
      // { path: 'hrsapupload', component: HrSapUploadComponent, outlet: 'pages' },
      // { path: 'supervisordashboard', component: DutyrosterSupervisorDashboardComponent, outlet: 'pages' },
      // { path: 'shiftold', component: DutyrosterCreateShiftsComponent, outlet: 'pages' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(DutyRosterRoutes)],
  exports: [RouterModule]
})

export class DutyRosterRoutingModule { }
