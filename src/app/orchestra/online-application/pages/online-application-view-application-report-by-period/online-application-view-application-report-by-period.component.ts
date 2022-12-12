import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnlineApplicationBaseService } from './../../../online-application/shared/services/online-application-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { log } from 'util';

@Component({
  selector: 'app-online-application-view-application-report-by-period',
  templateUrl: './online-application-view-application-report-by-period.component.html',
  styleUrls: ['./online-application-view-application-report-by-period.component.scss']
})
export class OnlineApplicationViewApplicationReportByPeriodComponent implements OnInit {

  showLoader: boolean;

  applicationList: any = [];
  applicationListPaginationInfo: any = [];
  allApplicationList: any = [];

  applicationCountCanceled: any;
  applicationCountCompleted: any;
  applicationCountDraft: any;
  applicationCountIncomplete: any;

  todayDate: any;
  fromDate: any;
  toDate: any;

  setClickedRow: Function;

  constructor(
    private domSanitizer: DomSanitizer,
    private onlineAppBase: OnlineApplicationBaseService) {
    // this.setClickedRow = function (index) {
    //   this.selectedRow = index;
    // };

    this.todayDate = moment().toISOString();
    if (this.todayDate !== null) {
      this.fromDate = moment(this.todayDate).subtract(30, 'days').local().format();
      this.toDate = moment(this.todayDate).add(1, 'days').local().format();
      if (this.fromDate !== null && this.toDate !== null) {
        this.getApplicationsByPeriod(this.fromDate, this.toDate);
      }
    }

    this.showLoader = false;
  }

  ngOnInit() {
  }


  reloadApplications() {
    this.applicationList = [];
    this.getApplicationsByPeriod(this.fromDate, this.toDate);
  }

  getApplicationsByPeriod(fromDate, toDate) {
    this.applicationList = [];
    this.showLoader = true;
    this.onlineAppBase.postApplicationsByPeriod(
      {
        'From': this.fromDate,
        'To': this.toDate,
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getApplicationsByPeriod data', data);

      // this.applicationListPaginationInfo = data.PaginationInfo;

      // var Canceled = 0;
      // var Completed = 0;
      // var Draft = 0;
      // var Incomplete = 0;

      // data.forEach(element => {
      //   console.log('element', element);
      //   this.applicationList.push(element);

      //   if (element.CurrentStageDescription === 'Canceled') {
      //     Canceled++;
      //     console.log('Canceled', Canceled);
      //   } else if (element.CurrentStageDescription === 'Completed') {
      //     Completed++;
      //     console.log('Completed', Completed);
      //   } else if (element.CurrentStageDescription === 'Draft') {
      //     Draft++;
      //     console.log('Draft', Draft);
      //   } else if (element.CurrentStageDescription === 'Incomplete') {
      //     Incomplete++;
      //     console.log('Incomplete', Incomplete);
      //   }
      // });

      // // tslint:disable-next-line:no-unused-expression
      // this.applicationCountCanceled == Canceled;
      // // tslint:disable-next-line:no-unused-expression
      // this.applicationCountCompleted == Completed;
      // // tslint:disable-next-line:no-unused-expression
      // this.applicationCountDraft == Draft;
      // // tslint:disable-next-line:no-unused-expression
      // this.applicationCountIncomplete == Incomplete;

      this.applicationCountCanceled = 0;
      this.applicationCountCompleted = 0;
      this.applicationCountDraft = 0;
      this.applicationCountIncomplete = 0;

      data.forEach(element => {
        console.log('element', element);
        this.applicationList.push(element);

        if (element.CurrentStageDescription === 'Canceled') {
          this.applicationCountCanceled++;
          console.log('Canceled', this.applicationCountCanceled);
        } else if (element.CurrentStageDescription === 'Completed') {
          this.applicationCountCompleted++;
          console.log('Completed', this.applicationCountCompleted);
        } else if (element.CurrentStageDescription === 'Draft') {
          this.applicationCountDraft++;
          console.log('Draft', this.applicationCountDraft);
        } else if (element.CurrentStageDescription === 'Incomplete') {
          this.applicationCountIncomplete++;
          console.log('Incomplete', this.applicationCountIncomplete);
        }
      });

      console.log('====================================');
      console.log('applicationCounter', this.applicationCountCanceled);
      console.log('applicationCounter', this.applicationCountCompleted);
      console.log('applicationCounter', this.applicationCountDraft);
      console.log('applicationCounter', this.applicationCountIncomplete);
      console.log('====================================');

      console.log('getApplicationsByPeriod - applicationList Pagination ->', this.applicationListPaginationInfo);
      console.log('getApplicationsByPeriod - applicationList Data ->', this.applicationList);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }


  download() {
    let downloadData = [];
    let downloadHeader = {
      ApplicationType: 'Application Type',
      CurrentStageDescription: 'Current Stage Description',
      ContactName: 'Contact Name',
      ContactNumber: 'Contact Number',
      CreatedBy: 'Contact By',
      CreatedNo: 'Contact No',
    };
    downloadData.push(downloadHeader);

    let downloadLine: any;

    this.applicationList.forEach(element => {
      downloadLine = {
        ApplicationType: element.ApplicationType.Description,
        CurrentStageDescription: element.CurrentStageDescription,
        ContactName: element.ContactName,
        ContactNumber: element.ContactNumber,
        CreatedBy: element.CreatedBy,
        CreatedNo: element.CreatedOn,
      };
      // console.log('downloadLine', downloadLine);
      downloadData.push(downloadLine);
    });
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(downloadData, 'Online Application -' + this.fromDate + ' to ' + this.toDate);
  }

}
