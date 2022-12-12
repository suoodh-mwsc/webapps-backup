import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { OnlinePaymentRoutingModule } from './online-payment-routing.module';
// Pages - Common Components
import { CommonComponentsModule } from '../../../../common-components/common-components.module';
// Pages-Components
import { OnlinePaymentDailyComponent } from './pages/online-payment-daily/online-payment-daily.component';
import { OnlinePaymentPendingComponent } from './pages/online-payment-pending/online-payment-pending.component';
import { OnlinePaymentSearchComponent } from './pages/online-payment-search/online-payment-search.component';
import { OnlinePaymentOnlineApplicationComponent} from './pages/online-payment-online-application/online-payment-online-application.component';
// Shared - Pages Component
import { OnlinePaymentHomeComponent } from './online-payment-home/online-payment-home.component';
import { OnlinePaymentNavbarComponent } from './shared/components/online-payment-navbar/online-payment-navbar.component';
import { OnlinePaymentTransactionComponent } from './shared/components/online-payment-transaction/online-payment-transaction.component';
import { OnlinePaymentLoaderComponent } from './shared/components/online-payment-loader/online-payment-loader.component';
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
import { OnlinePaymentBaseService } from './shared/services/online-payment-base.service';
// Custom Pipe

//Mulitple Pay SAP
import { OnlinePaymentPendingSapMultiplePayComponent } from './pages/online-payment-pending-sap-multiple-pay/online-payment-pending-sap-multiple-pay.component';
import { OnlinePaymentSapMultiplePayTransactionComponent } from './shared/components/online-payment-sap-multiple-pay-transaction/online-payment-sap-multiple-pay-transaction.component';
import { OnlinePaymentMulitpleAccountDailyComponent } from './pages/online-payment-mulitple-account-daily/online-payment-mulitple-account-daily.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

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
    OnlinePaymentRoutingModule,             // Routing
    // CommonComponentsModule,                 // Common Components-Module
    NgxJsonViewerModule,
  ],
  declarations: [
    OnlinePaymentHomeComponent,             // Pages-SharedComponents
    OnlinePaymentNavbarComponent,           // Pages-SharedComponents
    OnlinePaymentTransactionComponent,      // Pages-SharedComponents
    OnlinePaymentDailyComponent,            // Pages-Components
    OnlinePaymentPendingComponent,          // Pages-Components
    OnlinePaymentSearchComponent,           // Pages-Components
    OnlinePaymentOnlineApplicationComponent, // Pages-Components
    OnlinePaymentLoaderComponent,
    // OnlinePaymentsComponent,                // Common Components
    OnlinePaymentPendingSapMultiplePayComponent,
    OnlinePaymentSapMultiplePayTransactionComponent,

    OnlinePaymentMulitpleAccountDailyComponent,
  ],
  exports: [
    OnlinePaymentHomeComponent,             // Pages-SharedComponents
    OnlinePaymentTransactionComponent,      // Pages-SharedComponents
    OnlinePaymentNavbarComponent,           // Pages-SharedComponents
    OnlinePaymentDailyComponent,            // Pages-Components
    OnlinePaymentPendingComponent,          // Pages-Components
    OnlinePaymentSearchComponent,           // Pages-Components
    OnlinePaymentOnlineApplicationComponent, // Pages-Components
    OnlinePaymentLoaderComponent,

    OnlinePaymentPendingSapMultiplePayComponent,
    OnlinePaymentSapMultiplePayTransactionComponent,
    OnlinePaymentMulitpleAccountDailyComponent,
    
  ],
  providers: [
    OnlinePaymentBaseService,
  ]
})
export class OnlinePaymentModule { }
