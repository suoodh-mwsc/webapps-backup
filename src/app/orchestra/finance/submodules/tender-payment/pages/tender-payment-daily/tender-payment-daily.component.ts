import { Component, OnInit } from '@angular/core';
import { TenderPaymentBaseService } from '../../shared/services/tender-payment-base.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-tender-payment-daily',
  templateUrl: './tender-payment-daily.component.html',
  styleUrls: ['./tender-payment-daily.component.scss']
})
export class TenderPaymentDailyComponent implements OnInit {

    // transaction component - view type
    viewType: any = 'transaction-view';

  showLoader: boolean;
  searchDate: any = '';
  transactionsList: any;
  transactionsListWithPagination: any;

  constructor(private tenderPayBase: TenderPaymentBaseService) { }

  ngOnInit() {
  }


  search() {
    this.showLoader = true;
    this.transactionsList = [];
    this.tenderPayBase.getTenderDocumentPaymentsWithFilteredByDate(this.searchDate).subscribe(data => {
      console.log('search data', data);
      this.transactionsList = data;
      this.showLoader = false;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }
}
