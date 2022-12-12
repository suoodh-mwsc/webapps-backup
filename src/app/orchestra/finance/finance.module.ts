import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { FinanceRoutingModule } from './finance-routing.module';
// Pages-Components
import { FinanceDashboardComponent } from './pages/finance-dashboard/finance-dashboard.component';
// Common Components
import { AppTilesCommonMenuComponent } from '../../common-components/ui/app-tiles-common-menu/app-tiles-common-menu.component';
// Shared - Pages Component
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { FinanceNavComponent } from './shared/components/finance-nav/finance-nav.component';
import { FinanceSidebarComponent } from './shared/components/finance-sidebar/finance-sidebar.component';
import { FinanceProfileCardComponent } from './shared/components/finance-profile-card/finance-profile-card.component';
// Sub Modules
import { ExternalPaymentModule } from './submodules/external-payment/external-payment.module';
import { OnlinePaymentModule } from './submodules/online-payment/online-payment.module';
import { TppaPaymentModule } from './submodules/tppa-payment/tppa-payment.module';
import { TenderPaymentModule } from './submodules/tender-payment/tender-payment.module';

import { ExternalPaymentDailyComponent } from './submodules/external-payment/pages/external-payment-daily/external-payment-daily.component';
import { ExternalPaymentPendingComponent} from './submodules/external-payment/pages/external-payment-pending/external-payment-pending.component';
import { ExternalPaymentSearchComponent } from './submodules/external-payment/pages/external-payment-search/external-payment-search.component';

import { OnlinePaymentDailyComponent } from './submodules/online-payment/pages/online-payment-daily/online-payment-daily.component';
import { OnlinePaymentPendingComponent } from './submodules/online-payment/pages/online-payment-pending/online-payment-pending.component';
import { OnlinePaymentSearchComponent} from './submodules/online-payment/pages/online-payment-search/online-payment-search.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
// Services
import { FinanceBaseService } from './shared/services/finance-base.service';

// Custom Pipe

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    FinanceRoutingModule,                   // Routing
    // AppTilesCommonMenuComponent,         // Common Components
    ExternalPaymentModule,                  // Modules
    OnlinePaymentModule,                    // Modules
    TppaPaymentModule,                      // Modules
    TenderPaymentModule,                    // Modules
  ],
  declarations: [
    FinanceHomeComponent,                    // Pages-SharedComponents
    FinanceNavComponent,                     // Pages-SharedComponents
    FinanceSidebarComponent,                 // Pages-SharedComponents
    FinanceProfileCardComponent,             // Pages-SharedComponents
    FinanceDashboardComponent,               // Pages-Components
  ],
  exports: [
    FinanceHomeComponent,                    // Pages-SharedComponents
    FinanceNavComponent,                     // Pages-SharedComponents
    FinanceSidebarComponent,                 // Pages-SharedComponents
    FinanceProfileCardComponent,             // Pages-SharedComponents
    FinanceDashboardComponent,               // Pages-Components
  ],
  providers: [
    FinanceBaseService,
  ]
})
export class FinanceModule { }
