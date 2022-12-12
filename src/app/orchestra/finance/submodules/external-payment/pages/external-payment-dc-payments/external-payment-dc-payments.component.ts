import { Component, OnInit } from '@angular/core';
import { ExternalPaymentBaseService } from '../../shared/services/external-payment-base.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;


@Component({
  selector: 'app-external-payment-dc-payments',
  templateUrl: './external-payment-dc-payments.component.html',
  styleUrls: ['./external-payment-dc-payments.component.scss']
})
export class ExternalPaymentDcPaymentsComponent implements OnInit {
  showLoader: boolean;
  nowDateTime: any;

  organizations: any = [];
  selectedDate: any;
  selectedOrganization: any;
  transactions: any;

  constructor(private xPayBase: ExternalPaymentBaseService) {
    this.organizations = [];
    this.xPayBase.getOrganizations().subscribe(response => {
      console.log(response);
      // this.organizations = response;
      let organizationData = {
        Id: 0, Name: '*', ShortCode: 'All',
      };
      this.organizations.push(organizationData);

      response.forEach(elemt => {
        this.organizations.push(elemt);
      });
      console.log('Organizations -> Data', this.organizations);
    });
  }

  ngOnInit() {
  }

  loadTransactions() {
    this.showLoader = true;
    if (!this.selectedDate || !this.selectedOrganization) {
      alert('Select required fields');
    } else {
      this.xPayBase.getDcPaymentTransactions(this.selectedDate, this.selectedOrganization).subscribe(response => {
        this.showLoader = false;
        console.log(response);
        this.transactions = response;
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
    }
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
      TraceNo: 'Trace No',
      PaymentStatus: 'Payment Status',
    };

    downloadData.push(downloadHeader);
    this.transactions.forEach(transaction => {
      let downloadLine: any;

      let transactionPaymentMethod: any;
      if (transaction.PaymentMethod === '0') {
        transactionPaymentMethod = 'Cash';
      } else if (transaction.PaymentMethod === '1') {
        transactionPaymentMethod = 'Card';
      }

      let transactionPaymentStatus: any;
      if (transaction.PaymentStatus === '0') {
        transactionPaymentStatus = 'Create';
      } else if (transaction.PaymentStatus === '1') {
        transactionPaymentStatus = 'Void';
      } else if (transaction.PaymentStatus === '2')  {
        transactionPaymentStatus = 'Approved';
      }

      downloadLine = {
        TakenOn: transaction.TakenOn,
        Id: transaction.Id,
        AccountNo: transaction.CustomerSearch.CustomerDetail.AccountNo,
        OrganaizationName: transaction.Outlet.Organaization.Name,
        OutletName: transaction.Outlet.Name,
        PaymentAmount: transaction.PaymentAmount,
        // PaymentMethod: transaction.PaymentMethod,
        PaymentMethod: transactionPaymentMethod,
        TraceNo: transaction.TraceNo,
        // PaymentStatus: transaction.PaymentStatus,
        PaymentStatus: transactionPaymentStatus,
      };
      downloadData.push(downloadLine);
    });
    // tslint:disable-next-line:no-unused-expression
    this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
    // tslint:disable-next-line:no-construct
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
