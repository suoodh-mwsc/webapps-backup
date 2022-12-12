import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { HumanResourcesHomeComponent } from './human-resources-home/human-resources-home.component';
// Pages-Components
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { HrTestComponent } from './pages/hr-test/hr-test.component';
import { HrAttendanceReportComponent } from './pages/hr-attendance-report/hr-attendance-report.component';
import { HrAppraisalMassAssignAppraisalTypesComponent } from './pages/hr-appraisal-mass-assign-appraisal-types/hr-appraisal-mass-assign-appraisal-types.component';
// Pages-Components (hr-management)
import { HrDeskReportMedicalCertificateByYearComponent } from './modules/hr-management/pages/hr-desk-report-medical-certificate-by-year/hr-desk-report-medical-certificate-by-year.component';
// Pages-Components-(duty-roster-management)
import { DutyrosterHrApprovalComponent } from './modules/duty-roster-management/pages/dutyroster-hr-approval/dutyroster-hr-approval.component';
import { DutyrosterHrCreateShiftComponent } from './modules/duty-roster-management/pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterHrDashboardComponent } from './modules/duty-roster-management/pages/dutyroster-hr-dashboard/dutyroster-hr-dashboard.component';
import { DutyrosterHrSapUploadOffshiftComponent } from './modules/duty-roster-management/pages/dutyroster-hr-sap-upload-offshift/dutyroster-hr-sap-upload-offshift.component';
import { DutyrosterHrSapUploadShiftComponent } from './modules/duty-roster-management/pages/dutyroster-hr-sap-upload-shift/dutyroster-hr-sap-upload-shift.component';
import { DutyrosterHrShiftTemplateComponent } from './modules/duty-roster-management/pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';
// Pages-Components-(recruitment-management)
import { RecruitmentManageAdvertisementsComponent } from './modules/recruitment-management/pages/recruitment-manage-advertisements/recruitment-manage-advertisements.component';
import { RecruitmentManageApplicationShortlistsComponent } from './modules/recruitment-management/pages/recruitment-manage-application-shortlists/recruitment-manage-application-shortlists.component';
import { RecruitmentManageInterviewsComponent } from './modules/recruitment-management/pages/recruitment-manage-interviews/recruitment-manage-interviews.component';
import { RecruitmentManageJobPositionComponent } from './modules/recruitment-management/pages/recruitment-manage-job-position/recruitment-manage-job-position.component';
import { RecruitmentManageRecruitmentRequestsComponent } from './modules/recruitment-management/pages/recruitment-manage-recruitment-requests/recruitment-manage-recruitment-requests.component';
// Pages-Components-(recruitment-management)
import { RollCallAttendanceReportComponent } from './modules/roll-call-management/pages/roll-call-attendance-report/roll-call-attendance-report.component';



const HrRoutes: Routes = [
  { path: 'hr', component: HumanResourcesHomeComponent, canActivate: [AuthGuard] },
  {
    path: 'hr', component: HumanResourcesHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'hr-manage-report-medical-certificate-by-year', component: HrDeskReportMedicalCertificateByYearComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dashboard', component: HrDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'test', component: HrTestComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'attendanceReport', component: HrAttendanceReportComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'massUploadAppraisalTypes', component: HrAppraisalMassAssignAppraisalTypesComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  },

  {
    path: 'hr', component: HumanResourcesHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'recruitment-manage-advertisements', component: RecruitmentManageAdvertisementsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'recruitment-manage-application-shortlists', component: RecruitmentManageApplicationShortlistsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'recruitment-manage-interviews', component: RecruitmentManageInterviewsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'recruitment-manage-job-position', component: RecruitmentManageJobPositionComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'recruitment-manage-recruitment-requests', component: RecruitmentManageRecruitmentRequestsComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  },

  {
    path: 'hr', component: HumanResourcesHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'dutyroster-dashboard', component: DutyrosterHrDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dutyroster-manage-shifttemplate', component: DutyrosterHrShiftTemplateComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dutyroster-manage-shiftsapupload', component: DutyrosterHrSapUploadShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dutyroster-manage-offshiftsapupload', component: DutyrosterHrSapUploadOffshiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dutyroster-create-shift', component: DutyrosterHrCreateShiftComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild(HrRoutes) ],
  exports: [ RouterModule ]
})

export class HumanResourcesRoutingModule { }
