import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { TenderPaymentBaseService } from '../../../shared/services/tender-payment-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-tender-payment-common-view',
  templateUrl: './tender-payment-common-view.component.html',
  styleUrls: ['./tender-payment-common-view.component.scss']
})
export class TenderPaymentCommonViewComponent implements OnInit {

  showHistoryLoader: boolean;
  transactionHistory: any;

  @Input() transactionData: any;
  @Input() paymentDetails: any;

  constructor(private yoda: YodaService, private tenderPayBase: TenderPaymentBaseService) {

  }

  ngOnInit() {
    if (this.transactionData) {
      this.showTransactionHistory(this.transactionData.payment_id);
    }
  }


  showTransactionHistory(paymentId) {
    this.showHistoryLoader = true;
    this.tenderPayBase.postTenderDocumentPaymentTransactionHistory(paymentId).subscribe(data => {
      this.showHistoryLoader = false;
      this.transactionHistory = data;
      console.log('showTransactionHistory', this.transactionHistory);
    }, error => {
      this.showError(error);
      this.showHistoryLoader = false;
    });
  }


  showError(error) {
    var title = 'Error';
    var text = 'An error has occured';

    if (error.status === 400) {
      title = error.error.Message;
      if (error.error.ModelState) {
        text = '';
        for (var key in error.error.ModelState) {
          if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
            text += key.replace('model.', '') + ': ';

            // tslint:disable-next-line:forin
            for (var subkey in error.error.ModelState[key]) {
              text += error.error.ModelState[key][subkey] + '<br />';
            }
          } else if (error.error.ModelState[key].length > 0) {
            text += key.replace('model.', '') + ': ' + error.error.ModelState[key] + '<br />';
          }
        }
      }
    } else if (error.status === 404) {
      title = 'Oh Snap!';
      text = 'It seems that your request was Not found (404)';
    }

    var options = {
      title: title,
      html: text,
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false
    };

    Swal(options);
  }
}
