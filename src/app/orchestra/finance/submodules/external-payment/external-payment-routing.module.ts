
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// Home - Page
import { ExternalPaymentHomeComponent } from './external-payment-home/external-payment-home.component';
// Pages
import { ExternalPaymentDailyComponent } from './pages/external-payment-daily/external-payment-daily.component';
import { ExternalPaymentPendingComponent } from './pages/external-payment-pending/external-payment-pending.component';
import { ExternalPaymentSearchComponent } from './pages/external-payment-search/external-payment-search.component';


const ExternalPaymentRoutes: Routes = [
  {
    path: 'external-payment', component: ExternalPaymentHomeComponent, children: [
      { path: 'search', component: ExternalPaymentSearchComponent, outlet: 'pages' },
      { path: 'pending', component: ExternalPaymentPendingComponent, outlet: 'pages' },
      { path: 'daily', component: ExternalPaymentDailyComponent, outlet: 'pages' },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(ExternalPaymentRoutes) ],
  exports: [ RouterModule ]
})
export class ExternalPaymentRoutingModule { }
