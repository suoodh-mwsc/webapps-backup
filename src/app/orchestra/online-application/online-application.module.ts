
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { OnlineApplicationRoutingModule } from './online-application-routing.module';
// Common Components
// import { PageLoaderComponent } from './../common-components/ui/page-loader/page-loader.component';

// Shared-Layout
import { OnlineApplicationHomeComponent } from './online-application-home/online-application-home.component';
import { OnlineApplicationNavbarComponent } from './shared/components/online-application-navbar/online-application-navbar.component';
import { OnlineApplicationSidebarComponent } from './shared/components/online-application-sidebar/online-application-sidebar.component';
import { OnlineApplicationProfileCardComponent } from './shared/components/online-application-profile-card/online-application-profile-card.component';
import { OnlineApplicationLoaderComponent } from './shared/components/online-application-loader/online-application-loader.component';
// Pages-Components
import { OnlineApplicationDashboardComponent } from './pages/online-application-dashboard/online-application-dashboard.component';
import { OnlineApplicationCustomerSearchComponent } from './pages/online-application-customer-search/online-application-customer-search.component';
import { OnlineApplicationPaymentComponent } from './pages/online-application-payment/online-application-payment.component';
import { OnlineApplicationPendingComponent } from './pages/online-application-pending/online-application-pending.component';
import { OnlineApplicationViewApplicationComponent } from './pages/online-application-view-application/online-application-view-application.component';
import { OnlineApplicationQuotationUploadComponent } from './pages/online-application-quotation-upload/online-application-quotation-upload.component';
import { OnlineApplicationRejectApplicationComponent } from './pages/online-application-reject-application/online-application-reject-application.component';
import { OnlineApplicationSearchUserComponent } from './pages/online-application-search-user/online-application-search-user.component';
import { OnlineApplicationSearchByDateComponent } from './pages/online-application-search-by-date/online-application-search-by-date.component';
import { OnlineApplicationViewPendingApplicationDetailsComponent } from './pages/online-application-view-pending-application-details/online-application-view-pending-application-details.component';
import { OnlineApplicationUserComponent } from './pages/online-application-user/online-application-user.component';
import { OnlineApplicationViewApplicationReportByPeriodComponent } from './pages/online-application-view-application-report-by-period/online-application-view-application-report-by-period.component';
import { OnlineApplicationPendingV2Component } from './pages/online-application-pending-v2/online-application-pending-v2.component';
// Shared-Component
import { OnlineApplicationPendingDetailsComponent } from './shared/components/online-application-pending/online-application-pending-details/online-application-pending-details.component';
import { OnlineApplicationPendingListViewComponent } from './shared/components/online-application-pending/online-application-pending-list-view/online-application-pending-list-view.component';
import { OnlineApplicationPendingMainComponent } from './shared/components/online-application-pending/online-application-pending-main/online-application-pending-main.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { PaginationModule } from 'ngx-pagination-bootstrap';
// import { ArchwizardModule } from 'angular-archwizard';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
// Services
import { OnlineApplicationBaseService } from './shared/services/online-application-base.service';
// Custom Pipe
import { TruncatePipe } from './shared/pipe/truncate.pipe';
import { FilterArrayPipe } from './shared/pipe/filterArray.pipe';
import { KeysPipe } from './shared/pipe/keys.pipe';
import { SafeHtmlPipe } from './shared/pipe/safeHtml.pipe';
import { ComponentLibraryModule } from '../../shared/sub-module/component-library/component-library.module';
import { LayoutModule } from '../../shared/sub-module/layout/layout.module';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    HttpClientModule,
    ComponentLibraryModule,                                       // Component-Library
    LayoutModule,                                                 // Component-Library
    OnlineApplicationRoutingModule,                               // Routing
  ],
  declarations: [
    OnlineApplicationHomeComponent,                                // Layout-SharedComponents
    OnlineApplicationNavbarComponent,                              // Layout-SharedComponents
    OnlineApplicationSidebarComponent,                             // Layout-SharedComponents
    OnlineApplicationProfileCardComponent,                         // Layout-SharedComponents
    OnlineApplicationLoaderComponent,                              // Layout-SharedComponents
    OnlineApplicationDashboardComponent,                           // Pages-Components
    OnlineApplicationCustomerSearchComponent,                      // Pages-Components
    OnlineApplicationPaymentComponent,                             // Pages-Components
    OnlineApplicationPendingComponent,                             // Pages-Components
    OnlineApplicationViewApplicationComponent,                     // Pages-Components
    OnlineApplicationQuotationUploadComponent,                     // Pages-Components
    OnlineApplicationRejectApplicationComponent,                   // Pages-Components
    OnlineApplicationSearchUserComponent,                          // Pages-Components
    OnlineApplicationSearchByDateComponent,                        // Pages-Components
    OnlineApplicationViewPendingApplicationDetailsComponent,       // Pages-Components
    OnlineApplicationViewApplicationReportByPeriodComponent,       // Pages-Components
    OnlineApplicationUserComponent,                                // Pages-Components
    OnlineApplicationPendingV2Component,                           // Pages-Components
    OnlineApplicationPendingDetailsComponent,                      // Shared-Components
    OnlineApplicationPendingListViewComponent,                     // Shared-Components
    OnlineApplicationPendingMainComponent,                         // Shared-Components
    TruncatePipe,
    FilterArrayPipe,
    KeysPipe,
    SafeHtmlPipe
    // PageLoaderComponent,                     // Common Components
    // AppTilesCommonMenuComponent,             // Common Components
  ],
  exports: [
    OnlineApplicationHomeComponent,                                // Layout-SharedComponents
    OnlineApplicationNavbarComponent,                              // Layout-SharedComponents
    OnlineApplicationSidebarComponent,                             // Layout-SharedComponents
    OnlineApplicationProfileCardComponent,                         // Layout-SharedComponents
    OnlineApplicationLoaderComponent,                              // Layout-SharedComponents
    OnlineApplicationDashboardComponent,                           // Pages-Components
    OnlineApplicationCustomerSearchComponent,                      // Pages-Components
    OnlineApplicationPaymentComponent,                             // Pages-Components
    OnlineApplicationPendingComponent,                             // Pages-Components
    OnlineApplicationViewApplicationComponent,                     // Pages-Components
    OnlineApplicationQuotationUploadComponent,                     // Pages-Components
    OnlineApplicationRejectApplicationComponent,                   // Pages-Components
    OnlineApplicationSearchUserComponent,                          // Pages-Components
    OnlineApplicationSearchByDateComponent,                        // Pages-Components
    OnlineApplicationViewPendingApplicationDetailsComponent,       // Pages-Components
    OnlineApplicationViewApplicationReportByPeriodComponent,       // Pages-Components
    OnlineApplicationUserComponent,                                // Pages-Components
    OnlineApplicationPendingV2Component,                           // Pages-Components
    OnlineApplicationPendingDetailsComponent,                      // Shared-Components
    OnlineApplicationPendingListViewComponent,                     // Shared-Components
    OnlineApplicationPendingMainComponent,                         // Shared-Components
  ],
  providers: [
    OnlineApplicationBaseService,
  ],
})
export class OnlineApplicationModule { }
