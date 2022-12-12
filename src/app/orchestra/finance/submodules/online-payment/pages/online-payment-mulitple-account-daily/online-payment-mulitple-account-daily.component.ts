import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';

@Component({
  selector: 'app-online-payment-mulitple-account-daily',
  templateUrl: './online-payment-mulitple-account-daily.component.html',
  styleUrls: ['./online-payment-mulitple-account-daily.component.scss']
})
export class OnlinePaymentMulitpleAccountDailyComponent implements OnInit {
  searchDate: any;
  transactions: any;
  pageTopStatus: string;
  constructor(private oPayBase: OnlinePaymentBaseService, private yoda: YodaService) { }

  ngOnInit() {
    // this.search();
  }

  search() {
    this.pageTopStatus = 'Loading Please Wait ...';
    this.transactions = [];
    // var postData = {
    //   'SearchDate': this.searchDate
    // };

    this.yoda.get('Utility/OnlinePayments/UtilityMultipleAccountPayments/ByDate?Search_Date=' + this.searchDate)
      .subscribe(data => {
        this.transactions = data;
        console.log('SearchMP -> transactions', this.transactions);
        localStorage.setItem('allTransactions', JSON.stringify(this.transactions));
        this.pageTopStatus = '';
      });
  }

}
