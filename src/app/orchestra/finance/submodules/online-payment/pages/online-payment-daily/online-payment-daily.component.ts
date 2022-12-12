import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';


@Component({
  selector: 'app-online-payment-daily',
  templateUrl: './online-payment-daily.component.html',
  styleUrls: ['./online-payment-daily.component.scss']
})
export class OnlinePaymentDailyComponent implements OnInit {

  searchDate: any;
  transactions: any;
  pageTopStatus: string;

  constructor(private oPayBase: OnlinePaymentBaseService, private yoda: YodaService) { }

  ngOnInit() {
  }


  search() {
    this.pageTopStatus = 'Loading Please Wait ...';
    this.transactions = [];
    var postData = {
      'SearchDate': this.searchDate
    };

    this.yoda.post('Utility/OnlinePayments/ByDate', postData)
      .subscribe(data => {
        this.transactions = data;
        console.log('Search -> transactions', this.transactions);
        localStorage.setItem('allTransactions', JSON.stringify(this.transactions));
        this.pageTopStatus = '';
      });
  }

}
