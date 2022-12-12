import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { TenderPaymentRoutingModule } from './tender-payment-routing.module';
// Pages-Components
import { TenderPaymentSearchComponent } from './pages/tender-payment-search/tender-payment-search.component';
import { TenderPaymentPendingComponent } from './pages/tender-payment-pending/tender-payment-pending.component';
import { TenderPaymentDailyComponent } from './pages/tender-payment-daily/tender-payment-daily.component';
// Shared - Pages Component
import { TenderPaymentTransactionsComponent } from './shared/components/tender-payment-transactions/tender-payment-transactions.component';
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
import { TenderPaymentBaseService } from './shared/services/tender-payment-base.service';
import { TenderPaymentCommonViewComponent } from './shared/components/tender-payment-common-view/tender-payment-common-view.component';



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
    TenderPaymentRoutingModule,             // Routing
  ],
  declarations: [
    TenderPaymentCommonViewComponent,       // Pages-SharedComponents
    TenderPaymentTransactionsComponent,     // Pages-SharedComponents
    TenderPaymentDailyComponent,            // Pages-Components
    TenderPaymentPendingComponent,          // Pages-Components
    TenderPaymentSearchComponent,           // Pages-Components
  ],
  exports: [
    TenderPaymentCommonViewComponent,       // Pages-SharedComponents
    TenderPaymentTransactionsComponent,     // Pages-SharedComponents
    TenderPaymentDailyComponent,            // Pages-Components
    TenderPaymentPendingComponent,          // Pages-Components
    TenderPaymentSearchComponent,           // Pages-Components
  ],
  providers: [
    TenderPaymentBaseService,
  ]
})
export class TenderPaymentModule { }
