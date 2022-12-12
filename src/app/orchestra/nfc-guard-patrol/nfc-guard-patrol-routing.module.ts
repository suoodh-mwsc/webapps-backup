import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { NfcGuardPatrolHomeComponent } from './nfc-guard-patrol-home/nfc-guard-patrol-home.component';
// Pages-Components
import { NfcGuardPatrolSysadminDashboardComponent } from './pages/nfc-guard-patrol-sysadmin-dashboard/nfc-guard-patrol-sysadmin-dashboard.component';
import { NfcGuardPatrolSupervisorManageRoutesComponent } from './pages/nfc-guard-patrol-supervisor-manage-routes/nfc-guard-patrol-supervisor-manage-routes.component';
import { NfcGuardPatrolSupervisorRoutesAssignComponent } from './pages/nfc-guard-patrol-supervisor-routes-assign/nfc-guard-patrol-supervisor-routes-assign.component';
import { NfcGuardPatrolPendingComponent } from './pages/nfc-guard-patrol-pending/nfc-guard-patrol-pending.component';
import { NfcGuardPatrolOverviewComponent } from './pages/nfc-guard-patrol-overview/nfc-guard-patrol-overview.component';


const nfcGuardPatrolRoutes: Routes = [
  { path: 'nfc-guard-patrol', component: NfcGuardPatrolHomeComponent, canActivate: [AuthGuard] },
  {
    path: 'nfc-guard-patrol', component: NfcGuardPatrolHomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: NfcGuardPatrolSysadminDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'routes', component: NfcGuardPatrolSupervisorManageRoutesComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'routesAssign', component: NfcGuardPatrolSupervisorRoutesAssignComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'pending', component: NfcGuardPatrolPendingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'overview', component: NfcGuardPatrolOverviewComponent, canActivate: [AuthGuard], outlet: 'pages' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(nfcGuardPatrolRoutes)],
  exports: [RouterModule]
})
export class NfcGuardPatrolRoutingModule { }
