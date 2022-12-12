
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { AdminconsoleRoutingModule } from './adminconsole-routing.module';
// Pages-Components
import { AdminconsoleHomeComponent } from './adminconsole-home/adminconsole-home.component';
import { PromotionReportComponent } from './pages/promotion-report/promotion-report.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DutyrosterComponent } from './pages/dutyroster/dutyroster.component';
import { SadboxComponent } from './pages/sadbox/sadbox.component';
// Shared - Pages Component
import { AdminconsoleNavbarComponent } from './shared/components/adminconsole-navbar/adminconsole-navbar.component';
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
// Modules (Sub Modules)
import { EServiceRootModule } from './modules/e-service-root/e-service-root.module';
import { ItadminRootModule } from './modules/itadmin-root/itadmin-root.module';



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
    ItadminRootModule,                    // Root-Modules
    EServiceRootModule,                   // Root-Modules
    AdminconsoleRoutingModule,            // Routing
  ],
  exports: [
  ],
  declarations: [
    AdminconsoleHomeComponent,
    AdminconsoleNavbarComponent,
    DashboardComponent,
    PromotionReportComponent,
    DutyrosterComponent,
    SadboxComponent
  ],
  providers: [
  ],
})
export class AdminconsoleModule { }
