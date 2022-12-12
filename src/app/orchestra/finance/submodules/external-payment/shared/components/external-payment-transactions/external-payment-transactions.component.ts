import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-external-payment-transactions',
  templateUrl: './external-payment-transactions.component.html',
  styleUrls: ['./external-payment-transactions.component.scss']
})
export class ExternalPaymentTransactionsComponent implements OnInit {

  nowDateTime: any;
  
  @Input() showLoader: boolean;
  @Input() transactions: any;
  @Input() pageTopStatus: string;

  constructor(private yoda: YodaService) {
    this.transactions = {};
    this.pageTopStatus = 'Page Top';
  }

  ngOnInit() {
  }

  downloadCSV() {
    let downloadData = [];
    let downloadHeader = {
      TakenOn: 'Taken On',
      Id: 'Payment Gateway',
      AccountNo: 'Account No',
      OrganaizationName: 'Organaization Name',
      OutletName: 'OutletName',
      PaymentAmount: 'Payment Amount',
      PaymentMethod: 'Payment Method',
      CardType: 'Card Type',
      TraceNo: 'Trace No',
      PaymentStatus: 'Payment Status',
    };

    downloadData.push(downloadHeader);
    this.transactions.forEach(transaction => {
      let downloadLine: any;

      let transactionPaymentMethod: any;
      if (transaction.PaymentMethod == '0') {
        transactionPaymentMethod = 'Cash';
      } else if (transaction.PaymentMethod == '1') {
        transactionPaymentMethod = 'Card';
      }

      let transactionCardType: any;
      let transactionTraceNo: any;
      if (transaction.PaymentMethod == '0') {
        transactionCardType = '';
        transactionTraceNo = '';
      } else if (transaction.PaymentMethod == '1') {
        transactionCardType = transaction.CardType;
        transactionTraceNo = transaction.TraceNo;
      }

      let transactionPaymentStatus: any;
      if (transaction.PaymentStatus == '0') {
        transactionPaymentStatus = 'Create';
      } else if (transaction.PaymentStatus == '1') {
        transactionPaymentStatus = 'Void';
      } else if (transaction.PaymentStatus == '2') {
        transactionPaymentStatus = 'Approved';
      }

      downloadLine = {
        TakenOn: transaction.TakenOn,
        Id: transaction.Id,
        AccountNo: transaction.CustomerSearch.CustomerDetail.AccountNo,
        OrganaizationName: transaction.Outlet.Organaization.Name,
        OutletName: transaction.Outlet.Name,
        PaymentAmount: transaction.PaymentAmount,
        PaymentMethod: transactionPaymentMethod,
        CardType: transactionCardType,
        TraceNo: transactionTraceNo,
        PaymentStatus: transactionPaymentStatus,
      };
      downloadData.push(downloadLine);
    });
    // tslint:disable-next-line:no-unused-expression
    this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
    var reportTitle = new String('External-Payment ');
    var reportHeader = reportTitle.concat(this.nowDateTime);
    console.log('ReportTitleWithDate :', reportHeader);

    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: reportHeader,
      // useBom: true,
      // noDownload: true,
      headers: downloadHeader
    };
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(downloadData, reportHeader, options);
  }

}
