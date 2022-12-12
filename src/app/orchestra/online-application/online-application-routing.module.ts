import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { OnlineApplicationHomeComponent } from './online-application-home/online-application-home.component';
// Pages-Components
import { OnlineApplicationCustomerSearchComponent } from './pages/online-application-customer-search/online-application-customer-search.component';
import { OnlineApplicationDashboardComponent } from './pages/online-application-dashboard/online-application-dashboard.component';
import { OnlineApplicationPaymentComponent } from './pages/online-application-payment/online-application-payment.component';
import { OnlineApplicationSearchUserComponent } from './pages/online-application-search-user/online-application-search-user.component';
import { OnlineApplicationPendingComponent } from './pages/online-application-pending/online-application-pending.component';
import { OnlineApplicationViewApplicationComponent } from './pages/online-application-view-application/online-application-view-application.component';
import { OnlineApplicationQuotationUploadComponent } from './pages/online-application-quotation-upload/online-application-quotation-upload.component';
import { OnlineApplicationRejectApplicationComponent } from './pages/online-application-reject-application/online-application-reject-application.component';
import { OnlineApplicationSearchByDateComponent } from './pages/online-application-search-by-date/online-application-search-by-date.component';
import { OnlineApplicationViewApplicationReportByPeriodComponent } from './pages/online-application-view-application-report-by-period/online-application-view-application-report-by-period.component';
import { OnlineApplicationPendingV2Component } from './pages/online-application-pending-v2/online-application-pending-v2.component';



const OnlineApplicationRoutes: Routes = [
  {
    path: 'online-application', component: OnlineApplicationHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'dashboard', component: OnlineApplicationDashboardComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Dashboard' } },
      { path: 'customer-search', component: OnlineApplicationCustomerSearchComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'payment-search', component: OnlineApplicationPaymentComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'search-user', component: OnlineApplicationSearchUserComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'search-by-date', component: OnlineApplicationSearchByDateComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'pending-application', component: OnlineApplicationPendingComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'pending-application-v2', component: OnlineApplicationPendingV2Component, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'view-application', component: OnlineApplicationViewApplicationComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'quotation-upload', component: OnlineApplicationQuotationUploadComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'reject-application', component: OnlineApplicationRejectApplicationComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
      { path: 'view-report-by-period', component: OnlineApplicationViewApplicationReportByPeriodComponent, canActivate: [AuthGuard], outlet: 'pages', data: { title: 'Coupon Map' } },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(OnlineApplicationRoutes) ],
  exports: [ RouterModule ]
})

export class OnlineApplicationRoutingModule { }
