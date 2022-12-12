import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { ExternalPaymentRoutingModule } from './external-payment-routing.module';
// Pages-Components
import { ExternalPaymentDailyComponent } from './pages/external-payment-daily/external-payment-daily.component';
import { ExternalPaymentPendingComponent } from './pages/external-payment-pending/external-payment-pending.component';
import { ExternalPaymentSearchComponent } from './pages/external-payment-search/external-payment-search.component';
import { ExternalPaymentDcPaymentsComponent } from './pages/external-payment-dc-payments/external-payment-dc-payments.component';
// Shared - Pages Component
import { ExternalPaymentHomeComponent } from './external-payment-home/external-payment-home.component';
import { ExternalPaymentNavbarComponent } from './shared/components/external-payment-navbar/external-payment-navbar.component';
import { ExternalPaymentLoaderComponent } from './shared/components/external-payment-loader/external-payment-loader.component';
import { ExternalPaymentTransactionsComponent } from './shared/components/external-payment-transactions/external-payment-transactions.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import { SelectModule } from 'ng2-select';
import { ChartsModule } from 'ng2-charts';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { ExternalPaymentBaseService } from './shared/services/external-payment-base.service';
// Custom Pipe

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    SelectModule,
    ChartsModule,
    HttpClientModule,
    ExternalPaymentRoutingModule,             // Routing
  ],
  declarations: [
    ExternalPaymentHomeComponent,             // Pages-SharedComponents
    ExternalPaymentNavbarComponent,           // Pages-SharedComponents
    ExternalPaymentLoaderComponent,           // Pages-SharedComponents
    ExternalPaymentTransactionsComponent,     // Pages-SharedComponents
    ExternalPaymentDailyComponent,            // Pages-Components
    ExternalPaymentPendingComponent,          // Pages-Components
    ExternalPaymentSearchComponent,           // Pages-Components
    ExternalPaymentDcPaymentsComponent,       // Pages-Components
  ],
  exports: [
    ExternalPaymentHomeComponent,             // Pages-SharedComponents
    ExternalPaymentNavbarComponent,           // Pages-SharedComponents
    ExternalPaymentLoaderComponent,           // Pages-SharedComponents
    ExternalPaymentTransactionsComponent,     // Pages-SharedComponents
    ExternalPaymentDailyComponent,            // Pages-Components
    ExternalPaymentPendingComponent,          // Pages-Components
    ExternalPaymentSearchComponent,           // Pages-Components
    ExternalPaymentDcPaymentsComponent,       // Pages-Components
  ],
  providers: [
    ExternalPaymentBaseService,
  ]
})
export class ExternalPaymentModule { }
