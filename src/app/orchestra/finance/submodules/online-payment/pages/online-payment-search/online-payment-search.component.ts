import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
declare var Swal: any;

@Component({
  selector: 'app-online-payment-search',
  templateUrl: './online-payment-search.component.html',
  styleUrls: ['./online-payment-search.component.scss']
})
export class OnlinePaymentSearchComponent implements OnInit {
  showLoader: boolean;

  searchType: any;
  searchValue: string;
  transactions: any;
  pageTopStatus: string;

  constructor(
    private onlinePaymentBase: OnlinePaymentBaseService,
    private yoda: YodaService) {
    this.searchType = 'customer';
  }

  ngOnInit() {

  }


  search() {
    this.showLoader = true;

    this.pageTopStatus = 'Searching ...';
    var searchURL = 'Utility/OnlinePayments/ForAccountNo';
    var postData = {};

    postData = {
      'AccountNo': this.searchValue
    };

    if (this.searchType === 'transaction') {
      searchURL = 'Utility/OnlinePayments/ForTransactionNo';
      postData = {
        'TransactionNo': this.searchValue
      };
    }

    this.yoda.post(searchURL, postData).subscribe(data => {
      this.transactions = data;
      localStorage.setItem('allTransactions', JSON.stringify(this.transactions));
      this.showLoader = false;
      this.pageTopStatus = '';
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });

  }


}
