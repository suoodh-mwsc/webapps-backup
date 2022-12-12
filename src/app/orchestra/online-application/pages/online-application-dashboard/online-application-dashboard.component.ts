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


@Component({
  selector: 'app-online-application-dashboard',
  templateUrl: './online-application-dashboard.component.html',
  styleUrls: ['./online-application-dashboard.component.scss']
})
export class OnlineApplicationDashboardComponent implements OnInit {

  showLoader: boolean;

  applicationList: any = [];
  applicationListPaginationInfo: any = [];
  allApplicationList: any = [];

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
        this.getApplicationsByPeriod(this.fromDate, this.toDate)
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
      data.forEach(element => {
        this.applicationList.push(element);
      });

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
