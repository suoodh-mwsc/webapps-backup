import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { TppaPaymentRoutingModule } from './tppa-payment-routing.module';
// Pages-Components
import { TppaPaymentPendingComponent } from './pages/tppa-payment-pending/tppa-payment-pending.component';
import { TppaPaymentSearchComponent } from './pages/tppa-payment-search/tppa-payment-search.component';

import { TppaPaymentTransactionsComponent } from './shared/components/tppa-payment-transactions/tppa-payment-transactions.component';
// Services
import { TppaPaymentBaseService } from './shared/services/tppa-payment-base.service';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import { SelectModule } from 'ng2-select';
import { ChartsModule } from 'ng2-charts';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TppaPaymentLoaderComponent } from './shared/components/tppa-payment-loader/tppa-payment-loader.component';
// Shared Layout Components
// import { ComponentLibraryModule } from '../../../../shared/sub-module/component-library/component-library.module';

// import { TppaPaymentRoutingModule } from './tppa-payment-routing.module';

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
    TppaPaymentRoutingModule,             // Routing
    // ComponentLibraryModule                  // ShareModule-Component Library (Global)
  ],
  declarations: [
    TppaPaymentPendingComponent,            // Pages
    TppaPaymentSearchComponent,             // Pages
    TppaPaymentTransactionsComponent,       // Component
    TppaPaymentLoaderComponent,             // Component
  ],
  exports: [
    TppaPaymentPendingComponent,            // Pages
    TppaPaymentSearchComponent,             // Pages
    TppaPaymentTransactionsComponent,       // Component
    TppaPaymentLoaderComponent,             // Component
  ],
  providers: [
    TppaPaymentBaseService
  ]
})
export class TppaPaymentModule { }
