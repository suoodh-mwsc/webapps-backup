import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { EServiceRootRoutingModule } from './e-service-root-routing.module';
// Pages-Components
import { EServiceRootUserDisableComponent } from './pages/e-service-root-user-disable/e-service-root-user-disable.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import { SelectModule } from 'ng2-select';
import { ChartsModule } from 'ng2-charts';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { EServiceRootBaseService } from './services/e-service-root-base.service';

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
    EServiceRootRoutingModule
  ],
  exports: [
    EServiceRootUserDisableComponent,
  ],
  declarations: [
    EServiceRootUserDisableComponent,
  ],
  providers: [
    EServiceRootBaseService
  ]
})
export class EServiceRootModule { }
