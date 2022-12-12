import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { SelfCareRoutingModule } from './self-care-routing.module';
// Pages-Components
import { MyStaffAttendanceComponent} from './pages/my-staff-attendance/my-staff-attendance.component'
import { MyStaffAttendeanceReportComponent } from './pages/my-staff-attendeance-report/my-staff-attendeance-report.component';
import { MyStaffAttendanceDetailReportComponent } from './pages/my-staff-attendance-detail-report/my-staff-attendance-detail-report.component';
// Shared - Pages Component
import { SelfCareHomeComponent } from './self-care-home/self-care-home.component'
import { SelfCareLoaderComponent } from './shared/components/self-care-loader/self-care-loader.component'
import { SelfCareNavbarComponent } from './shared/components/self-care-navbar/self-care-navbar.component'
// Services
import { SelfCareBaseService } from './shared/services/self-care-base.service';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    SelfCareRoutingModule,                      // Routing
  ],
  declarations: [
    SelfCareHomeComponent,                      // Pages-SharedComponents
    SelfCareNavbarComponent,                    // Pages-SharedComponents
    SelfCareLoaderComponent,                    // Pages-SharedComponents
    MyStaffAttendanceComponent,                 // Pages-Components
    MyStaffAttendeanceReportComponent,          // Pages-Components
    MyStaffAttendanceDetailReportComponent,     // Pages-Components
  ],
  exports: [
    SelfCareHomeComponent,                      // Pages-SharedComponents
    SelfCareNavbarComponent,                    // Pages-SharedComponents
    SelfCareLoaderComponent,                    // Pages-SharedComponents
    MyStaffAttendanceComponent,                 // Pages-Components
    MyStaffAttendeanceReportComponent,          // Pages-Components
    MyStaffAttendanceDetailReportComponent,     // Pages-Components
  ],
  providers: [
    SelfCareBaseService
  ]
})
export class SelfCareModule { }
