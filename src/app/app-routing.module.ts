import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// Auth Services
import { AuthGuard } from './core/services/auth/auth-guard';
// CoreModule - Componets
import { ErrorLoginTimeOutComponent } from './core/components/error-login-time-out/error-login-time-out.component';
import { ErrorUnauthorizedComponent } from './core/components/error-unauthorized/error-unauthorized.component';
// Sub-Modules
import { DutyRosterHomeComponent } from './orchestra/duty-roster/duty-roster-home/duty-roster-home.component';
import { NfcGuardPatrolHomeComponent} from './orchestra/nfc-guard-patrol/nfc-guard-patrol-home/nfc-guard-patrol-home.component';
import { AdminconsoleHomeComponent } from './orchestra/adminconsole/adminconsole-home/adminconsole-home.component';
import { HumanResourcesHomeComponent } from './orchestra/human-resources/human-resources-home/human-resources-home.component';
import { OnlineApplicationHomeComponent } from './orchestra/online-application/online-application-home/online-application-home.component';
import { FacilityBookingHomeComponent } from './orchestra/facility-booking/facility-booking-home/facility-booking-home.component';
import { EServiceHomeComponent } from './orchestra/e-service/e-service-home/e-service-home.component';
import { SelfCareHomeComponent } from './orchestra/self-care/self-care-home/self-care-home.component';
// Finance with Sub Modules
import { FinanceHomeComponent } from './orchestra/finance/finance-home/finance-home.component';

// import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  // { path: 'redirect-to-login', component: AppComponent },
  { path: 'error-login-time-out', component: ErrorLoginTimeOutComponent },
  { path: 'error-unauthorized', component: ErrorUnauthorizedComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'dutyroster', component: DutyRosterHomeComponent, canActivate: [AuthGuard] },
  { path: 'nfc-guard-patrol', component: NfcGuardPatrolHomeComponent, canActivate: [AuthGuard] },
  { path: 'root', component: AdminconsoleHomeComponent, canActivate: [AuthGuard] },
  { path: 'facility-booking', component: FacilityBookingHomeComponent, canActivate: [AuthGuard] },
  { path: 'finance', component: FinanceHomeComponent, canActivate: [AuthGuard] },
  { path: 'online-application', component: OnlineApplicationHomeComponent, canActivate: [AuthGuard] },
  { path: 'hr', component: HumanResourcesHomeComponent, canActivate: [AuthGuard] },
  { path: 'e-service', component: EServiceHomeComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: SelfCareHomeComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
