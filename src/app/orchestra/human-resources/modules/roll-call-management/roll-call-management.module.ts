import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { RollCallManagementRoutingModule } from './roll-call-management-routing.module';
// Pages-Components
import { RollCallAttendanceReportComponent } from './pages/roll-call-attendance-report/roll-call-attendance-report.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RollCallBaseService } from './services/roll-call-base.service';
// Services


@NgModule({
  imports: [
    CommonModule,
    RollCallManagementRoutingModule
  ],
  exports: [
    RollCallAttendanceReportComponent
  ],
  declarations: [
    RollCallAttendanceReportComponent
  ],
  providers: [
    RollCallBaseService
  ],
})
export class RollCallManagementModule { }
