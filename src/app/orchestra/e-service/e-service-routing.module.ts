import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { EServiceHomeComponent } from './e-service-home/e-service-home.component';
// Pages-Components
import { EServiceDashboardComponent } from './pages/e-service-dashboard/e-service-dashboard.component';
import { EServiceSearchUserComponent } from './pages/e-service-search-user/e-service-search-user.component';
import { EServiceAccountNotificationComponent } from './pages/e-service-account-notification/e-service-account-notification.component';

const eService: Routes = [
  {
    path: 'e-service', component: EServiceHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: EServiceDashboardComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Dashboard' } },
      { path: 'search-user', component: EServiceSearchUserComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'account-notifications', component: EServiceAccountNotificationComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(eService)],
  exports: [RouterModule]
})
export class EServiceRoutingModule { }
