import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { HumanResourcesRoutingModule } from './human-resources-routing.module';
// Pages-Components
import { HrDashboardComponent } from './pages/hr-dashboard/hr-dashboard.component';
import { HrAppraisalMassAssignAppraisalTypesComponent } from './pages/hr-appraisal-mass-assign-appraisal-types/hr-appraisal-mass-assign-appraisal-types.component';
import { HrTestComponent } from './pages/hr-test/hr-test.component';
import { HrAttendanceReportComponent } from './pages/hr-attendance-report/hr-attendance-report.component';
// Shared - Pages Component
import { HumanResourcesHomeComponent } from './human-resources-home/human-resources-home.component';
import { HrNavComponent } from './shared/components/hr-nav/hr-nav.component';
import { HrLoaderComponent } from './shared/components/hr-loader/hr-loader.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import { SelectModule } from 'ng2-select';
import { ChartsModule } from 'ng2-charts';
import swal from 'sweetalert2';
// Services
import { HrBaseService } from './shared/services/hr-base.service';
import { GlobalService } from '../../services/global.service';
// Modules (Sub Modules)
import { HrManagementModule } from './modules/hr-management/hr-management.module';
import { DutyRosterManagementModule } from './modules/duty-roster-management/duty-roster-management.module';
import { RecruitmentManagementModule } from './modules/recruitment-management/recruitment-management.module';
import { RollCallManagementModule } from './modules/roll-call-management/roll-call-management.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    ChartsModule,
    HttpClientModule,
    HrManagementModule,               // Sub Modules
    DutyRosterManagementModule,       // Sub Modules
    RecruitmentManagementModule,      // Sub Modules
    RollCallManagementModule,         // Sub Modules
    HumanResourcesRoutingModule,      // Routing
  ],
  exports: [
    HumanResourcesHomeComponent,
    HrNavComponent,
    HrLoaderComponent,
    HrDashboardComponent,
    HrAppraisalMassAssignAppraisalTypesComponent,
    HrTestComponent,
  ],
  declarations: [
    HumanResourcesHomeComponent,
    HrNavComponent,
    HrLoaderComponent,
    HrDashboardComponent,
    HrAppraisalMassAssignAppraisalTypesComponent,
    HrTestComponent,
    HrAttendanceReportComponent,
  ],
  providers: [
    HrBaseService,
    GlobalService,
  ]
})

export class HumanResourcesModule { }
