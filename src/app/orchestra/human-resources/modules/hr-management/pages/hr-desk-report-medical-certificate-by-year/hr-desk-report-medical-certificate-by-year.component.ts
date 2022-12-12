import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { HrManagementBaseService } from '../../services/hr-management-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { YodaService } from '../../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';


@Component({
  selector: 'app-hr-desk-report-medical-certificate-by-year',
  templateUrl: './hr-desk-report-medical-certificate-by-year.component.html',
  styleUrls: ['./hr-desk-report-medical-certificate-by-year.component.scss']
})
export class HrDeskReportMedicalCertificateByYearComponent implements OnInit {

  searchText: any;
  medicalCertificateByYearReport: any = [];
  showLoader: boolean;

  constructor(private hrBase: HrManagementBaseService) {
    this.showLoader = false;
  }

  ngOnInit() {
  }


  searchHRDeskMedicalCertificateByYearReport(searchText) {
    this.showLoader = true;
    this.hrBase.postHRDeskMedicalCertificateByYearReport(
      {
        'Year': searchText,
      }
    ).subscribe((data: any) => {
      this.medicalCertificateByYearReport = data;
      console.log('MedicalCertificateByYearReport ->', this.medicalCertificateByYearReport);
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

}
