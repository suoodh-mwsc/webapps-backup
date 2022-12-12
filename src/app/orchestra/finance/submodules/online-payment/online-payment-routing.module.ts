
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Home - Page
import { OnlinePaymentHomeComponent } from './online-payment-home/online-payment-home.component';
// Pages
import { OnlinePaymentDailyComponent } from './pages/online-payment-daily/online-payment-daily.component';
import { OnlinePaymentPendingComponent } from './pages/online-payment-pending/online-payment-pending.component';
import { OnlinePaymentSearchComponent } from './pages/online-payment-search/online-payment-search.component';
import { OnlinePaymentOnlineApplicationComponent } from './pages/online-payment-online-application/online-payment-online-application.component';

import { OnlinePaymentPendingSapMultiplePayComponent } from './pages/online-payment-pending-sap-multiple-pay/online-payment-pending-sap-multiple-pay.component';
import { OnlinePaymentMulitpleAccountDailyComponent } from './pages/online-payment-mulitple-account-daily/online-payment-mulitple-account-daily.component';
// Pages - Common Components


const OnlinePaymentRoutes: Routes = [
  {
    path: 'online-payment', component: OnlinePaymentHomeComponent, children: [
      { path: 'search', component: OnlinePaymentSearchComponent, outlet: 'pages' },
      { path: 'pending', component: OnlinePaymentPendingComponent, outlet: 'pages' },
      { path: 'daily', component: OnlinePaymentDailyComponent, outlet: 'pages' },
      { path: 'online-application-payments', component: OnlinePaymentOnlineApplicationComponent, outlet: 'pages' },

      { path: 'online-payment-pending-sap-mulitiple-pay', component: OnlinePaymentPendingSapMultiplePayComponent, outlet: 'pages' },
      { path: 'online-payment-multiple-account-daily', component: OnlinePaymentMulitpleAccountDailyComponent, outlet: 'pages' },


    ]
  }
]; 

@NgModule({
  imports: [ RouterModule.forChild(OnlinePaymentRoutes) ],
  exports: [ RouterModule ]
})
export class OnlinePaymentRoutingModule { }
