import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { FacilityBookingRoutingModule } from './facility-booking-routing.module';
// Pages-Components
import { FacilityBookingNewBookingComponent } from './pages/facility-booking-new-booking/facility-booking-new-booking.component';
import { FacilityBookingViewBookingListComponent } from './pages/facility-booking-view-booking-list/facility-booking-view-booking-list.component';
// Shared - Pages Component
import { FacilityBookingHomeComponent } from './facility-booking-home/facility-booking-home.component';
import { FacilityBookingNavbarComponent } from './shared/components/facility-booking-navbar/facility-booking-navbar.component';
import { FacilityBookingSidebarComponent } from './shared/components/facility-booking-sidebar/facility-booking-sidebar.component';
import { FacilityBookingProfileCardComponent } from './shared/components/facility-booking-profile-card/facility-booking-profile-card.component';
import { FacilityBookingLoaderComponent } from './shared/components/facility-booking-loader/facility-booking-loader.component';

// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { FacilityBookingBaseService } from './shared/services/facility-booking-base.service';
// Custom Pipe

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    CalendarModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FacilityBookingRoutingModule                // Routing
  ],
  declarations: [
    FacilityBookingHomeComponent,               // Pages-SharedComponents
    FacilityBookingNavbarComponent,             // Pages-SharedComponents
    FacilityBookingSidebarComponent,            // Pages-SharedComponents
    FacilityBookingProfileCardComponent,        // Pages-SharedComponents
    FacilityBookingLoaderComponent,             // Pages-SharedComponents
    FacilityBookingNewBookingComponent,         // Pages-Components
    FacilityBookingViewBookingListComponent,    // Pages-Components
  ],
  exports: [
    FacilityBookingHomeComponent,               // Pages-SharedComponents
    FacilityBookingNavbarComponent,             // Pages-SharedComponents
    FacilityBookingSidebarComponent,            // Pages-SharedComponents
    FacilityBookingProfileCardComponent,        // Pages-SharedComponents
    FacilityBookingLoaderComponent,             // Pages-SharedComponents
    FacilityBookingNewBookingComponent,         // Pages-Components
    FacilityBookingViewBookingListComponent,    // Pages-Components
  ],
  providers: [
    FacilityBookingBaseService,
  ],

})
export class FacilityBookingModule { }
