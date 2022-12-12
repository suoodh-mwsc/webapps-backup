import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var Swal: any;

@Component({
  selector: 'app-online-payment-online-application',
  templateUrl: './online-payment-online-application.component.html',
  styleUrls: ['./online-payment-online-application.component.scss']
})
export class OnlinePaymentOnlineApplicationComponent implements OnInit {

  showLoader: boolean;

  searchType: any;
  searchValue: string;
  transactions: any = [];
  pageTopStatus: string;

  newSearch: any;

  constructor(
    private onlinePaymentBase: OnlinePaymentBaseService,
    private yoda: YodaService) {
      this.search(50, 1);
  }

  ngOnInit() {
  }


  search(pageSize, pageNumber) {
    this.showLoader = true;
    this.onlinePaymentBase.postOnlineApplicationsPayments(
      {
        'PageSize': pageSize,
        'PageNumber': pageNumber
      }
    ).subscribe(data => {
      data.Payments.forEach(element => {
        this.transactions.push(element);
      });
      console.log('postOnlineApplicationsPayments -> transactions', this.transactions);
      localStorage.setItem('OnlinePaymentOnlineApplicationTransactions', JSON.stringify(this.transactions));
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }


  searchMore(pageSize, pageNum) {
    this.showLoader = true;
    this.newSearch.PageSize = pageSize;
    this.newSearch.PageNumber = pageNum;

    this.onlinePaymentBase.postOnlineApplicationsPayments(
      {
        'PageSize': this.newSearch.PageSize ,
        'PageNumber': this.newSearch.PageNumber
      }
    ).subscribe(data => {
      data.Payments.forEach(element => {
        this.transactions.push(element);
      });
      console.log('postOnlineApplicationsPayments -> transactions', this.transactions);
      localStorage.setItem('OnlinePaymentOnlineApplicationTransactions', JSON.stringify(this.transactions));
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

}
