import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { EServiceRoutingModule } from './e-service-routing.module';
// Pages-Components
import { EServiceDashboardComponent } from './pages/e-service-dashboard/e-service-dashboard.component';
import { EServiceSearchUserComponent } from './pages/e-service-search-user/e-service-search-user.component';
import { EServiceAccountNotificationComponent } from './pages/e-service-account-notification/e-service-account-notification.component';
// Shared - Pages Component
import { EServiceHomeComponent } from './e-service-home/e-service-home.component';
import { EServiceLoaderComponent } from './shared/components/e-service-loader/e-service-loader.component';
import { EServiceNavbarComponent } from './shared/components/e-service-navbar/e-service-navbar.component';
import { EServiceProfileCardComponent } from './shared/components/e-service-profile-card/e-service-profile-card.component';
import { EServiceSidebarComponent } from './shared/components/e-service-sidebar/e-service-sidebar.component';
import { EServiceUserListViewComponent } from './shared/components/e-service-user-list-view/e-service-user-list-view.component';
import { EServiceApplicationViewComponent } from './shared/components/e-service-application-view/e-service-application-view.component';
import { EServiceNotificationViewComponent } from './shared/components/e-service-notification-view/e-service-notification-view.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { EServiceBaseService } from './shared/services/e-service-base.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    EServiceRoutingModule                     // Routing
  ],
  declarations: [
    EServiceHomeComponent,                    // Pages-SharedComponents
    EServiceLoaderComponent,                  // Pages-SharedComponents
    EServiceNavbarComponent,                  // Pages-SharedComponents
    EServiceProfileCardComponent,             // Pages-SharedComponents
    EServiceSidebarComponent,                 // Pages-SharedComponents
    EServiceUserListViewComponent,            // Module-Components
    EServiceApplicationViewComponent,         // Module-Components
    EServiceNotificationViewComponent,        // Module-Components
    EServiceDashboardComponent,               // Pages-Components
    EServiceSearchUserComponent,              // Pages-Components
    EServiceAccountNotificationComponent,     // Pages-Components
  ],
  exports: [
    EServiceHomeComponent,                    // Pages-SharedComponents
    EServiceLoaderComponent,                  // Pages-SharedComponents
    EServiceNavbarComponent,                  // Pages-SharedComponents
    EServiceProfileCardComponent,             // Pages-SharedComponents
    EServiceSidebarComponent,                 // Pages-SharedComponents
    EServiceUserListViewComponent,            // Module-Components
    EServiceApplicationViewComponent,         // Module-Components
    EServiceNotificationViewComponent,        // Module-Components
    EServiceDashboardComponent,               // Pages-Components
    EServiceSearchUserComponent,              // Pages-Components
    EServiceAccountNotificationComponent,     // Pages-Components
  ],
  providers: [
    EServiceBaseService,
  ],
})
export class EServiceModule { }
