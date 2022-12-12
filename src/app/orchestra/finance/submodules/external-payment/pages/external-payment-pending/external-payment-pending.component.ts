import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ExternalPaymentBaseService } from '../../shared/services/external-payment-base.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;


@Component({
  selector: 'app-external-payment-pending',
  templateUrl: './external-payment-pending.component.html',
  styleUrls: ['./external-payment-pending.component.scss']
})
export class ExternalPaymentPendingComponent implements OnInit {

  @ViewChild('manualUpdateToSAPModal') manualUpdateToSAPModal: ElementRef;

  showLoader: boolean;
  nowDateTime: any;

  pendingDates: any;
  organizations: any;
  selectedDate: any;
  selectedOrganization: any;
  pendingTransactions: any;
  transactions: any;

  manualUpdateToSAPTransaction: any;
  manualUpdateSAPReference: string;

  constructor(private xPayBase: ExternalPaymentBaseService) {
    this.loadSearchCriterias();

    this.organizations = [];
    this.xPayBase.getOrganizations().subscribe(response => {
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
      title = 'Oh snap!';
      text = 'It seems that your request was Not found (404)';
    }
    var options = {
      title: title,
      html: text,
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false
    };
    // this.alertService.error(options);
    Swal(options);
  }


  loadSearchCriterias() {
    this.xPayBase.getPendingDates().subscribe(response => {
      console.log(response);
      this.pendingDates = response;
    });
  }


  loadPendingTransactions() {
    this.showLoader = true;
    if (!this.selectedDate || !this.selectedOrganization) {
      alert('Select Required Fields');
    } else {
      this.xPayBase.getPendingTransactions(this.selectedDate, this.selectedOrganization).subscribe(response => {
        this.showLoader = false;
        console.log(response);
        this.pendingTransactions = response;
        this.transactions = response;
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
    }
  }

  updatePendingTransactionsToSAP() {
    this.showLoader = true;
    if (!this.selectedDate || !this.selectedOrganization) {
      alert('Select Required Fields');
    } else {
      this.xPayBase.getPendingTransactionsUpdateToSAP(this.selectedDate, this.selectedOrganization).subscribe(response => {
        this.showLoader = false;
        console.log(response);
        this.pendingTransactions = response;
        this.transactions = response;
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
    }
  }

  approve(transaction) {
    console.log(transaction);
    this.xPayBase.approveTransaction(transaction.Id)
      .subscribe(data => {
        console.log(data['PaymentStatus']);
        let deleteIndex = this.pendingTransactions.indexOf(transaction);
        this.pendingTransactions.splice(deleteIndex, 1);
        this.loadSearchCriterias();
      },
        error => {
          console.log(error);
          this.showError(error);
        }
      );
  }

  showManualUpdateToSAPModal(transaction) {
    this.manualUpdateToSAPTransaction = transaction;
    this.manualUpdateToSAPModal.nativeElement.className = 'modal fade show';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideManualUpdateToSAPModal() {
    this.manualUpdateToSAPModal.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }

  updateToSAPManually(transaction) {
    console.log(transaction);
    this.xPayBase.manuallyupdateToSAP(transaction, this.manualUpdateSAPReference)
      .subscribe(data => {
        transaction = data;
      },
        error => {
          console.log(error);
          this.showError(error);
        }
      );
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
      if (transaction.PaymentMethod === '0') {
        transactionPaymentMethod = 'Cash';
      } else if (transaction.PaymentMethod === '1') {
        transactionPaymentMethod = 'Card';
      }

      let transactionCardType: any;
      let transactionTraceNo: any;
      if (transaction.PaymentMethod === '0') {
        transactionCardType = '';
        transactionTraceNo = '';
      } else if (transaction.PaymentMethod === '1') {
        transactionCardType = transaction.CardType;
        transactionTraceNo = transaction.TraceNo;
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
        PaymentMethod: transactionPaymentMethod,
        CardType: transactionCardType,
        TraceNo: transactionTraceNo,
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
