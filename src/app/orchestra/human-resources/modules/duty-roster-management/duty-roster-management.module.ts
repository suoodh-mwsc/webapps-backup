import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DutyRosterManagementRoutingModule } from './duty-roster-management-routing.module';
// Components
import { DutyRosterLoaderComponent } from './components/duty-roster-loader/duty-roster-loader.component';
// Pages-Components
import { DutyrosterHrApprovalComponent } from './pages/dutyroster-hr-approval/dutyroster-hr-approval.component';
import { DutyrosterHrCreateShiftComponent } from './pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterHrDashboardComponent } from './pages/dutyroster-hr-dashboard/dutyroster-hr-dashboard.component';
import { DutyrosterHrSapUploadOffshiftComponent } from './pages/dutyroster-hr-sap-upload-offshift/dutyroster-hr-sap-upload-offshift.component';
import { DutyrosterHrSapUploadShiftComponent } from './pages/dutyroster-hr-sap-upload-shift/dutyroster-hr-sap-upload-shift.component';
import { DutyrosterHrShiftTemplateComponent } from './pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';

import { HrLoaderComponent } from './../../shared/components/hr-loader/hr-loader.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { DutyRosterBaseService } from './services/duty-roster-base.service';
import { HumanResourcesModule } from '../../human-resources.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    // HumanResourcesModule,
    DutyRosterManagementRoutingModule
  ],
  exports: [
    DutyRosterLoaderComponent,
    DutyrosterHrApprovalComponent,
    DutyrosterHrCreateShiftComponent,
    DutyrosterHrDashboardComponent,
    DutyrosterHrSapUploadOffshiftComponent,
    DutyrosterHrSapUploadShiftComponent,
    DutyrosterHrShiftTemplateComponent
  ],
  declarations: [
    DutyRosterLoaderComponent,
    DutyrosterHrApprovalComponent,
    DutyrosterHrCreateShiftComponent,
    DutyrosterHrDashboardComponent,
    DutyrosterHrSapUploadOffshiftComponent,
    DutyrosterHrSapUploadShiftComponent,
    DutyrosterHrShiftTemplateComponent
  ],
  providers: [
    DutyRosterBaseService
  ],
})
export class DutyRosterManagementModule { }
