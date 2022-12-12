
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Components - Pages
import { AdminconsoleHomeComponent } from './adminconsole-home/adminconsole-home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DutyrosterComponent } from './pages/dutyroster/dutyroster.component';
import { SadboxComponent } from './pages/sadbox/sadbox.component';
// Pages-Components (e-service-root - Module)
import { EServiceRootUserDisableComponent } from './modules/e-service-root/pages/e-service-root-user-disable/e-service-root-user-disable.component';
// Pages-Components (itadmin-root - Module)
import { ItadminActiveDirectoryComponent } from './modules/itadmin-root/pages/itadmin-active-directory/itadmin-active-directory.component';







const AdminconsoleRoutes: Routes = [
  { path: 'root', component: AdminconsoleHomeComponent, canActivate: [AuthGuard], },
  {
    path: 'root', component: AdminconsoleHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], outlet: 'pages'},
      { path: 'promotionReport', component: DashboardComponent, canActivate: [AuthGuard], outlet: 'pages'},
      { path: 'dutyroster', component: DutyrosterComponent, canActivate: [AuthGuard], outlet: 'pages'},
      { path: 'sandbox', component: SadboxComponent, canActivate: [AuthGuard], outlet: 'pages'},
    ]
  },
  {
    path: 'root', component: AdminconsoleHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'e-service-root-disable-user', component: EServiceRootUserDisableComponent, canActivate: [AuthGuard], outlet: 'pages'},
    ]
  },
  {
    path: 'root', component: AdminconsoleHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'itadmin-active-directory', component: ItadminActiveDirectoryComponent, canActivate: [AuthGuard], outlet: 'pages'},
    ]
  }
];


@NgModule({
  imports: [ RouterModule.forChild(AdminconsoleRoutes) ],
  exports: [ RouterModule ]
})
export class AdminconsoleRoutingModule { }
