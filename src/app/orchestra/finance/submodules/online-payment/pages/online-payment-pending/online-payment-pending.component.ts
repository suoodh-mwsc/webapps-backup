import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';

@Component({
  selector: 'app-online-payment-pending',
  templateUrl: './online-payment-pending.component.html',
  styleUrls: ['./online-payment-pending.component.scss']
})
export class OnlinePaymentPendingComponent implements OnInit {

  title: string;
  transactions: any;
  pageTopStatus: string;

  constructor(private oPayBase: OnlinePaymentBaseService, private yoda: YodaService) {
    this.pageTopStatus = 'Loading Pending Transactions ...';
    this.transactions = [];
    this.title = '';
    // this.yoda.get('Utility/OnlinePayments/NotUploadedToSAP')
    this.yoda.get('Finance/OnlinePayments/NotUploadedToSAP')
      .subscribe(data => {
        this.transactions = data;
        console.log('Search -> transactions', this.transactions);
        localStorage.setItem('allTransactions', JSON.stringify(this.transactions));
        this.pageTopStatus = '';
      });
  }


  ngOnInit() {
  }

}
