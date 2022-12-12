
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
// Common Components
import { CommonComponentsModule } from './../../common-components/common-components.module';
// Pages-Components
// import { HrSapUploadOffshiftComponent } from './pages/hr-sap-upload-offshift/hr-sap-upload-offshift.component';
// import { HrSapUploadComponent } from './pages/hr-sap-upload/hr-sap-upload.component';

import { DutyrosterHrDashboardComponent } from './pages/dutyroster-hr-dashboard/dutyroster-hr-dashboard.component';
import { DutyrosterHrShiftTemplateComponent } from './pages/dutyroster-hr-shift-template/dutyroster-hr-shift-template.component';
import { DutyrosterHrSapUploadOffshiftComponent } from './pages/dutyroster-hr-sap-upload-offshift/dutyroster-hr-sap-upload-offshift.component';
import { DutyrosterHrSapUploadShiftComponent } from './pages/dutyroster-hr-sap-upload-shift/dutyroster-hr-sap-upload-shift.component';
import { DutyrosterHrCreateShiftComponent } from './pages/dutyroster-hr-create-shift/dutyroster-hr-create-shift.component';
import { DutyrosterCreateShiftsComponent } from './pages/dutyroster-create-shifts/dutyroster-create-shifts.component';
import { DutyrosterMyDutyrosterComponent } from './pages/dutyroster-my-dutyroster/dutyroster-my-dutyroster.component';
import { DutyrosterSupervisorDashboardComponent } from './pages/dutyroster-supervisor-dashboard/dutyroster-supervisor-dashboard.component';
import { DutyrosterSupervisorCreateShiftsComponent } from './pages/dutyroster-supervisor-create-shifts/dutyroster-supervisor-create-shifts.component';
import { DutyrosterHrApprovalComponent } from './pages/dutyroster-hr-approval/dutyroster-hr-approval.component';
// Shared - Pages Component
import { DutyRosterHomeComponent } from './duty-roster-home/duty-roster-home.component';
import { DutyrosterNavbarComponent } from './shared/components/dutyroster-navbar/dutyroster-navbar.component';
import { DutyrosterSidenavComponent } from './shared/components/dutyroster-sidenav/dutyroster-sidenav.component';
import { DutyrosterLoaderComponent } from './shared/components/dutyroster-loader/dutyroster-loader.component';
// Module - Component
import { DutyrosterHrShiftgroupComponent } from './shared/components/dutyroster-hr-shiftgroup/dutyroster-hr-shiftgroup.component';
import { DutyrosterShiftCalendarComponent } from './shared/components/dutyroster-shift-calendar/dutyroster-shift-calendar.component';
import { DutyrosterSupervisorShiftgroupComponent } from './shared/components/dutyroster-supervisor-shiftgroup/dutyroster-supervisor-shiftgroup.component';
import { DutyrosterShiftCalenderEmployeeListComponent } from './shared/components/dutyroster-shift-calender-employee-list/dutyroster-shift-calender-employee-list.component';
import { DutyrosterShiftCalenderWeekViewComponent } from './shared/components/dutyroster-shift-calender-week-view/dutyroster-shift-calender-week-view.component';
import { DutyrosterHrShiftCalendarComponent } from './shared/components/dutyroster-hr-shift-calendar/dutyroster-hr-shift-calendar.component';
import { DutyrosterSupervisorShiftCalendarComponent } from './shared/components/dutyroster-supervisor-shift-calendar/dutyroster-supervisor-shift-calendar.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { DutyRosterBaseService } from './shared/services/duty-roster-base.service';
import { DutyRosterGlobalService } from './shared/services/duty-roster-global.service';
// Custom Pipe
import { TruncatePipe } from './shared/pipe/truncate.pipe';
import { FilterArrayPipe } from './shared/pipe/filterArray.pipe';
import { KeysPipe } from './shared/pipe/Keys.pipe';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    DutyRosterRoutingModule,            // Routing
    CommonComponentsModule,             // Common Components
  ],
  declarations: [
    DutyRosterHomeComponent,                      // Pages-SharedComponents
    DutyrosterNavbarComponent,                    // Pages-SharedComponents
    DutyrosterSidenavComponent,                   // Pages-SharedComponents
    DutyrosterLoaderComponent,                    // Pages-SharedComponents
    DutyrosterHrDashboardComponent,               // Pages-Components
    DutyrosterHrShiftTemplateComponent,           // Pages-Components
    DutyrosterHrSapUploadOffshiftComponent,       // Pages-Components
    DutyrosterHrSapUploadShiftComponent,          // Pages-Components
    DutyrosterHrCreateShiftComponent,             // Pages-Components
    DutyrosterCreateShiftsComponent,              // Pages-Components
    DutyrosterSupervisorCreateShiftsComponent,    // Pages-Components
    DutyrosterSupervisorDashboardComponent,       // Pages-Components
    DutyrosterHrApprovalComponent,                // Pages-Components
    DutyrosterMyDutyrosterComponent,              // Pages-Components
    DutyrosterHrShiftgroupComponent,              // Module-Components
    DutyrosterShiftCalendarComponent,             // Module-Components
    DutyrosterSupervisorShiftgroupComponent,      // Module-Components
    DutyrosterShiftCalenderEmployeeListComponent, // Module-Components
    DutyrosterShiftCalenderWeekViewComponent,     // Module-Components
    DutyrosterHrShiftCalendarComponent,           // Module-Components
    DutyrosterSupervisorShiftCalendarComponent,   // Module-Components
    TruncatePipe,
    FilterArrayPipe,
    KeysPipe,
  ],
  exports: [
    DutyRosterHomeComponent,                      // Pages-SharedComponents
    DutyrosterNavbarComponent,                    // Pages-SharedComponents
    DutyrosterSidenavComponent,                   // Pages-SharedComponents
    DutyrosterLoaderComponent,                    // Pages-SharedComponents
    DutyrosterHrDashboardComponent,               // Pages-Components
    DutyrosterHrShiftTemplateComponent,           // Pages-Components
    DutyrosterHrSapUploadOffshiftComponent,       // Pages-Components
    DutyrosterHrSapUploadShiftComponent,          // Pages-Components
    DutyrosterHrCreateShiftComponent,             // Pages-Components
    DutyrosterCreateShiftsComponent,              // Pages-Components
    DutyrosterSupervisorCreateShiftsComponent,    // Pages-Components
    DutyrosterSupervisorDashboardComponent,       // Pages-Components
    DutyrosterHrApprovalComponent,                // Pages-Components
    DutyrosterMyDutyrosterComponent,              // Pages-Components
    DutyrosterHrShiftgroupComponent,              // Module-Components
    DutyrosterShiftCalendarComponent,             // Module-Components
    DutyrosterSupervisorShiftgroupComponent,      // Module-Components
    DutyrosterShiftCalenderEmployeeListComponent, // Module-Components
    DutyrosterShiftCalenderWeekViewComponent,     // Module-Components
  ],
  providers: [
    // PushNotificationComponent,
    DutyRosterBaseService,
    DutyRosterGlobalService,
  ],
})
export class DutyRosterModule { }
