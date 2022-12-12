import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnlineApplicationBaseService } from './../../../online-application/shared/services/online-application-base.service';
import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Component({
  selector: 'app-online-application-search-user',
  templateUrl: './online-application-search-user.component.html',
  styleUrls: ['./online-application-search-user.component.scss']
})
export class OnlineApplicationSearchUserComponent implements OnInit {
  showLoader: boolean;


  completedApplications: any = [];
  applicationList: any = [];
  userDetails: any = [];
  searchText: any = '';



  externalPayments: any = [];
  onlinePayments: any = [];
  payments: any = [];

  constructor(
    private domSanitizer: DomSanitizer,
    private onlineAppBase: OnlineApplicationBaseService) {
    this.applicationList = [];
    this.userDetails = [];

    this.payments = [
      { Account: '', externalPayments: [], onlinePayments: [] },
    ];

  }


  ngOnInit() {

  }


  searchPortalUser(searchText) {
    this.showLoader = true;
    this.applicationList = [];
    this.userDetails = [];
    console.log('postePortalUserSearch', searchText);
    this.onlineAppBase.postePortalUserSearch(
      {
        'SearchValue': searchText,
      }
    ).subscribe((data: any) => {
      this.applicationList = data;
      console.log('searchPortalUser', this.applicationList);

      if (this.applicationList.length > 1) {
        for (var j = 0; j < this.applicationList.length; j++) {
          // console.log('searchPortalUser', this.applicationList[j]);

          if (this.applicationList[j].UtilityAccounts.length > 1) {

            for (var i = 0; i < this.applicationList[j].UtilityAccounts.length; i++) {
              // tslint:disable-next-line:no-unused-expression
              // console.log('All Accounts', this.applicationList[j].UtilityAccounts[i]);
              // Get all Online - Payments
              this.onlineAppBase.postOnlinePaymentsSearchByAccountNo(
                {
                  'AccountNo': this.applicationList[j].UtilityAccounts[i].AccountNo,
                }
              ).subscribe((opay: any) => {
                // console.log('OnlinePayments', opay);
                this.onlinePayments = opay;
                // var arryFilter = { opay };
                // this.applicationList[j].UtilityAccounts[i].AccountNo.push(arryFilter);
              });
              // Get all External - Payments
              this.onlineAppBase.getExternalPaymentsSearchByAccountNo(this.applicationList[j].UtilityAccounts[i].AccountNo).subscribe((xpay: any) => {
                // console.log('ExternalPayments', xpay);
                this.externalPayments = xpay;

                var arryFilter = { Account: this.applicationList[j].UtilityAccounts[i].AccountNo, externalPayments: this.externalPayments, onlinePayments: this.onlinePayments };
                this.payments.push(arryFilter);
                // this.applicationList[j].UtilityAccounts[i].AccountNo.push(this.externalPayments);
              });
            }

          }

        }
      }


      console.log('searchPortalUser', this.applicationList);
      this.showLoader = false;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }


  selectDetails(userDetails) {
    console.log('selectDetails -> userDetails', userDetails);
    this.userDetails = userDetails;
    this.applicationList = [];
  }

  goBackToSearch(searchText) {
    this.searchPortalUser(searchText);
  }

  clearSearch() {
    this.searchText = '';
    this.showLoader = false;
    this.applicationList = [];
    this.userDetails = [];
  }


}
