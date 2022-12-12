import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnlineApplicationBaseService } from './../../../online-application/shared/services/online-application-base.service';
import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'app-online-application-search-by-date',
  templateUrl: './online-application-search-by-date.component.html',
  styleUrls: ['./online-application-search-by-date.component.scss']
})
export class OnlineApplicationSearchByDateComponent implements OnInit {

  showLoader: boolean;

  searchDate: any;

  completedApplications: any = [];
  applicationList: any = [];
  setClickedRow: Function;

  constructor(
    private domSanitizer: DomSanitizer,
    private onlineAppBase: OnlineApplicationBaseService) {
    this.applicationList = [];
  }

  ngOnInit() {

  }


  searchOnlineApplicationsByDate(searchDate) {
    this.showLoader = true;
    this.applicationList = [];
    console.log('searchOnlineApplicationsByDate', searchDate);
    this.onlineAppBase.postOnlineApplicationsSearchByDate(
      {
        'SearchValue': searchDate,
      }
    ).subscribe((data: any) => {
      console.log('searchOnlineApplicationsByDate', data);
      this.applicationList = data;
      this.showLoader = false;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  viewPendingApplicationList() {

  }

}
