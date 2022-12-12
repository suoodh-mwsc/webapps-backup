import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { NfcGuardPatrolRoutingModule } from './nfc-guard-patrol-routing.module';
// Shared - Pages Component
import { NfcGuardPatrolHomeComponent } from './nfc-guard-patrol-home/nfc-guard-patrol-home.component';
import { NfcGuardPatrolNavbarComponent } from './shared/components/nfc-guard-patrol-navbar/nfc-guard-patrol-navbar.component';
import { NfcGuardPatrolSidenavComponent } from './shared/components/nfc-guard-patrol-sidenav/nfc-guard-patrol-sidenav.component';
import { NfcGuardPatrolProfileCardComponent } from './shared/components/nfc-guard-patrol-profile-card/nfc-guard-patrol-profile-card.component';
import { NfcGuardPatrolLoaderComponent } from './shared/components/nfc-guard-patrol-loader/nfc-guard-patrol-loader.component';
// Pages-Components
import { NfcGuardPatrolSysadminDashboardComponent } from './pages/nfc-guard-patrol-sysadmin-dashboard/nfc-guard-patrol-sysadmin-dashboard.component';
import { NfcGuardPatrolSupervisorManageRoutesComponent } from './pages/nfc-guard-patrol-supervisor-manage-routes/nfc-guard-patrol-supervisor-manage-routes.component';
import { NfcGuardPatrolSupervisorRoutesAssignComponent } from './pages/nfc-guard-patrol-supervisor-routes-assign/nfc-guard-patrol-supervisor-routes-assign.component';
import { NfcGuardPatrolPendingComponent } from './pages/nfc-guard-patrol-pending/nfc-guard-patrol-pending.component';
import { NfcGuardPatrolOverviewComponent } from './pages/nfc-guard-patrol-overview/nfc-guard-patrol-overview.component';
import { NfcGuardPatrolSupervisorAssignedRoutesLogComponent } from './pages/nfc-guard-patrol-supervisor-assigned-routes-log/nfc-guard-patrol-supervisor-assigned-routes-log.component';
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
import { NfcGuardPatrolBaseService } from './shared/services/nfc-guard-patrol-base.service';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    SelectModule,
    ChartsModule,
    HttpClientModule,
    NfcGuardPatrolRoutingModule,                    // Routing
  ],
  declarations: [
    NfcGuardPatrolHomeComponent,                    // Pages-SharedComponents
    NfcGuardPatrolNavbarComponent,                  // Pages-SharedComponents
    NfcGuardPatrolSidenavComponent,                 // Pages-SharedComponents
    NfcGuardPatrolProfileCardComponent,             // Pages-SharedComponents
    NfcGuardPatrolLoaderComponent,                  // Pages-SharedComponents
    NfcGuardPatrolSysadminDashboardComponent,       // Pages-Components
    NfcGuardPatrolSupervisorManageRoutesComponent,  // Pages-Components
    NfcGuardPatrolSupervisorRoutesAssignComponent,  // Pages-Components
    NfcGuardPatrolPendingComponent,                 // Pages-Components
    NfcGuardPatrolOverviewComponent,                // Pages-Components
    NfcGuardPatrolSupervisorAssignedRoutesLogComponent, // Pages-Components
  ],
  exports: [
    NfcGuardPatrolHomeComponent,                    // Pages-SharedComponents
    NfcGuardPatrolNavbarComponent,                  // Pages-SharedComponents
    NfcGuardPatrolSidenavComponent,                 // Pages-SharedComponents
    NfcGuardPatrolProfileCardComponent,             // Pages-SharedComponents
    NfcGuardPatrolLoaderComponent,                  // Pages-SharedComponents
    NfcGuardPatrolSysadminDashboardComponent,       // Pages-Components
    NfcGuardPatrolSupervisorManageRoutesComponent,  // Pages-Components
    NfcGuardPatrolSupervisorRoutesAssignComponent,  // Pages-Components
    NfcGuardPatrolPendingComponent,                 // Pages-Components
    NfcGuardPatrolOverviewComponent,                // Pages-Components
    NfcGuardPatrolSupervisorAssignedRoutesLogComponent, // Pages-Components
  ],
  providers: [
    NfcGuardPatrolBaseService
  ],
})
export class NfcGuardPatrolModule { }
