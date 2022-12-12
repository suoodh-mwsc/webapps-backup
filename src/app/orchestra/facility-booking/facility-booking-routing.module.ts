import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { FacilityBookingHomeComponent } from './facility-booking-home/facility-booking-home.component';
// Pages-Components
import { FacilityBookingNewBookingComponent } from './pages/facility-booking-new-booking/facility-booking-new-booking.component';
import { FacilityBookingViewBookingListComponent } from './pages/facility-booking-view-booking-list/facility-booking-view-booking-list.component';


const FacilityBookingRoutes: Routes = [
  {
    path: 'facility-booking', component: FacilityBookingHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'booking', component: FacilityBookingNewBookingComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Booking' } },
      { path: 'booking-list', component: FacilityBookingViewBookingListComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Booking List' } },
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild(FacilityBookingRoutes) ],
  exports: [ RouterModule ]
})
export class FacilityBookingRoutingModule { }
