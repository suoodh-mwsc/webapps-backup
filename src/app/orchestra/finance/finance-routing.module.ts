import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Auth Services
import { AuthGuard } from './../../core/services/auth/auth-guard';
// Shared - Pages Component
import { FinanceHomeComponent } from './finance-home/finance-home.component';
// Pages-Components
import { FinanceDashboardComponent } from './pages/finance-dashboard/finance-dashboard.component';
import { ExternalPaymentHomeComponent } from './submodules/external-payment/external-payment-home/external-payment-home.component';
import { OnlinePaymentHomeComponent } from './submodules/online-payment/online-payment-home/online-payment-home.component';

import { TppaPaymentSearchComponent } from './submodules/tppa-payment/pages/tppa-payment-search/tppa-payment-search.component';
import { TppaPaymentPendingComponent } from './submodules/tppa-payment/pages/tppa-payment-pending/tppa-payment-pending.component';

import { ExternalPaymentDailyComponent } from './submodules/external-payment/pages/external-payment-daily/external-payment-daily.component';
import { ExternalPaymentPendingComponent } from './submodules/external-payment/pages/external-payment-pending/external-payment-pending.component';
import { ExternalPaymentSearchComponent } from './submodules/external-payment/pages/external-payment-search/external-payment-search.component';
import { ExternalPaymentDcPaymentsComponent } from './submodules/external-payment/pages/external-payment-dc-payments/external-payment-dc-payments.component';

import { OnlinePaymentDailyComponent } from './submodules/online-payment/pages/online-payment-daily/online-payment-daily.component';
import { OnlinePaymentPendingComponent } from './submodules/online-payment/pages/online-payment-pending/online-payment-pending.component';
import { OnlinePaymentSearchComponent } from './submodules/online-payment/pages/online-payment-search/online-payment-search.component';
import { OnlinePaymentOnlineApplicationComponent } from './submodules/online-payment/pages/online-payment-online-application/online-payment-online-application.component';
import { TenderPaymentSearchComponent } from './submodules/tender-payment/pages/tender-payment-search/tender-payment-search.component';
import { TenderPaymentPendingComponent } from './submodules/tender-payment/pages/tender-payment-pending/tender-payment-pending.component';
import { TenderPaymentDailyComponent } from './submodules/tender-payment/pages/tender-payment-daily/tender-payment-daily.component';

import { OnlinePaymentPendingSapMultiplePayComponent } from './submodules/online-payment/pages/online-payment-pending-sap-multiple-pay/online-payment-pending-sap-multiple-pay.component';
import { OnlinePaymentMulitpleAccountDailyComponent } from './submodules/online-payment/pages/online-payment-mulitple-account-daily/online-payment-mulitple-account-daily.component';


export const FinanceRoutes: Routes = [
  { path: 'finance', component: FinanceHomeComponent, canActivate: [AuthGuard], },
  {
    path: 'finance', component: FinanceHomeComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: FinanceHomeComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'dashboard', component: FinanceDashboardComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'external-payment', component: ExternalPaymentHomeComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment', component: OnlinePaymentHomeComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'tppa-payment-search', component: TppaPaymentSearchComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'tppa-payment-pending', component: TppaPaymentPendingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'external-payment-search', component: ExternalPaymentSearchComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'external-payment-pending', component: ExternalPaymentPendingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'external-payment-daily', component: ExternalPaymentDailyComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'external-payment-dc-payments', component: ExternalPaymentDcPaymentsComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment-search', component: OnlinePaymentSearchComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment-pending', component: OnlinePaymentPendingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment-daily', component: OnlinePaymentDailyComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment-online-application-payments', component: OnlinePaymentOnlineApplicationComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'tender-payment-search', component: TenderPaymentSearchComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'tender-payment-pending', component: TenderPaymentPendingComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'tender-payment-daily', component: TenderPaymentDailyComponent, canActivate: [AuthGuard], outlet: 'pages' },

      { path: 'online-payment-pending-sap-mulitiple-pay', component: OnlinePaymentPendingSapMultiplePayComponent, canActivate: [AuthGuard], outlet: 'pages' },
      { path: 'online-payment-multiple-account-daily', component: OnlinePaymentMulitpleAccountDailyComponent, canActivate: [AuthGuard], outlet: 'pages' },


    ],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(FinanceRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class FinanceRoutingModule { }
