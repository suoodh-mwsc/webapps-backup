import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { RecruitmentManagementRoutingModule } from './recruitment-management-routing.module';
// Pages-Components
import { RecruitmentManageAdvertisementsComponent } from './pages/recruitment-manage-advertisements/recruitment-manage-advertisements.component';
import { RecruitmentManageApplicationShortlistsComponent } from './pages/recruitment-manage-application-shortlists/recruitment-manage-application-shortlists.component';
import { RecruitmentManageInterviewsComponent } from './pages/recruitment-manage-interviews/recruitment-manage-interviews.component';
import { RecruitmentManageJobPositionComponent } from './pages/recruitment-manage-job-position/recruitment-manage-job-position.component';
import { RecruitmentManageRecruitmentRequestsComponent } from './pages/recruitment-manage-recruitment-requests/recruitment-manage-recruitment-requests.component';
// Plugins
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import * as moment from 'moment/moment';
import swal from 'sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Services
import { RecruitmentBaseService } from './services/recruitment-base.service';



@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    HttpClientModule,
    RecruitmentManagementRoutingModule
  ],
  exports: [
    RecruitmentManageAdvertisementsComponent,
    RecruitmentManageApplicationShortlistsComponent,
    RecruitmentManageInterviewsComponent,
    RecruitmentManageJobPositionComponent,
    RecruitmentManageRecruitmentRequestsComponent
  ],
  declarations: [
    RecruitmentManageAdvertisementsComponent,
    RecruitmentManageApplicationShortlistsComponent,
    RecruitmentManageInterviewsComponent,
    RecruitmentManageJobPositionComponent,
    RecruitmentManageRecruitmentRequestsComponent
  ],
  providers: [
    RecruitmentBaseService
  ],
})
export class RecruitmentManagementModule { }
