import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EServiceBaseService } from './../../../../e-service/shared/services/e-service-base.service';
import { YodaService } from '../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare var Swal: any;

import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-e-service-user-list-view',
  templateUrl: './e-service-user-list-view.component.html',
  styleUrls: ['./e-service-user-list-view.component.scss']
})
export class EServiceUserListViewComponent implements OnInit {
  
  eServiceNotificationShowLoader: boolean;

  completedApplications: any = [];
  userDetails: any = [];
  searchText: any = '';

  // Notification
  allNotifications: any = [];
  eServiceNotifications: any = [];
  eServiceApplications: any = [];
  selectedeServiceUser: any;

  externalPayments: any = [];
  onlinePayments: any = [];
  payments: any = [];


  @Input() eServiceUsers: any;
  @Input() eServiceUserShowLoader: boolean;

  constructor(private eServiceBase: EServiceBaseService) {
    this.eServiceUsers = {};
    this.eServiceUserShowLoader = false;
  }

  ngOnInit() {
  }


  eServiceAccountNotifications(eServiceAccount) {
    this.selectedeServiceUser = 
    this.eServiceNotifications = [];
    this.eServiceApplications = [];
    this.eServiceNotificationShowLoader = true;
    this.allNotifications.PageSize = 10;
    this.allNotifications.PageNumber = 1;
    console.log('eServiceNotifications', eServiceAccount);
    this.eServiceBase.postePortalUserNotifications({
          'Username': eServiceAccount.UserName,
          'PageSize': this.allNotifications.PageSize,
          'PageNumber': this.allNotifications.PageNumber
      }).subscribe((data: any) => {
          data.Result.forEach(ele => {
            this.eServiceNotifications.push(ele);
          });
          console.log('eServiceAccountDetails', this.eServiceApplications);
          console.log('eServiceNotifications', this.eServiceNotifications);
          this.eServiceNotificationShowLoader = false;
        },
        (error: Response | any) => {
          this.eServiceNotificationShowLoader = false;
          return Observable.throw(new Error(error.status));
        });
  }


  eServiceAccountDetails(eServiceAccount){
    console.log('eServiceAccountDetails', eServiceAccount);
    this.eServiceNotifications = [];
    this.eServiceApplications = [];
    this.eServiceApplications = eServiceAccount;
    console.log('eServiceAccountDetails', this.eServiceApplications);
    console.log('eServiceNotifications', this.eServiceNotifications);
  }


}
