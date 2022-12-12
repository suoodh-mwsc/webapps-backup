import { Component, OnInit } from '@angular/core';
import { OnlinePaymentBaseService } from '../../shared/services/online-payment-base.service';
import { YodaService } from './../../../../../../services/yoda.service';

@Component({
  selector: 'app-online-payment-pending-sap-multiple-pay',
  templateUrl: './online-payment-pending-sap-multiple-pay.component.html',
  styleUrls: ['./online-payment-pending-sap-multiple-pay.component.scss']
})
export class OnlinePaymentPendingSapMultiplePayComponent implements OnInit {
  title: string;
  transactions: any;
  pageTopStatus: string;
  showLoader = false

    constructor(private oPayBase: OnlinePaymentBaseService, private yoda: YodaService) {
      this.getNotUploadedToSap();

  }
  getNotUploadedToSap(){
    this.pageTopStatus = 'Loading Pending Transactions ...';
    this.transactions = [];
    this.title = '';
    // this.yoda.get('Utility/OnlinePayments/NotUploadedToSAP')
    this.showLoader = true;
    this.yoda.get('finance/utility-multiple-account_payments/not-uploaded-to-sap')
      .subscribe(data => {
        this.showLoader = false;
        this.transactions = data;
        console.log('Search -> transactionsSAP', this.transactions);
        localStorage.setItem('allTransactions', JSON.stringify(this.transactions));
        this.pageTopStatus = '';
      },
      error => {
        this.showLoader = false;
      } );

  }

  ngOnInit() {
  }

}
