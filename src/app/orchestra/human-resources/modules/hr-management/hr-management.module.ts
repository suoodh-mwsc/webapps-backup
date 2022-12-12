import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { HrManagementRoutingModule } from './hr-management-routing.module';
// Pages-Components
import { HrDeskReportMedicalCertificateByYearComponent } from './pages/hr-desk-report-medical-certificate-by-year/hr-desk-report-medical-certificate-by-year.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { HrManagementBaseService } from './services/hr-management-base.service';
import { HrManagementLoaderComponent } from './components/hr-management-loader/hr-management-loader.component';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    HrManagementRoutingModule
  ],
  exports: [
    HrManagementLoaderComponent,
    HrDeskReportMedicalCertificateByYearComponent
  ],
  declarations: [
    HrManagementLoaderComponent,
    HrDeskReportMedicalCertificateByYearComponent
  ],
  providers: [
    HrManagementBaseService
  ],
})
export class HrManagementModule { }
