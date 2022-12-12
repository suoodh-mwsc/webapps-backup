import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { TppaPaymentBaseService } from '../../../shared/services/tppa-payment-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';
declare var Swal: any;

@Component({
  selector: 'app-tppa-payment-transactions',
  templateUrl: './tppa-payment-transactions.component.html',
  styleUrls: ['./tppa-payment-transactions.component.scss']
})
export class TppaPaymentTransactionsComponent implements OnInit {

  nowDateTime: any;

  historyTransaction: any;
  failedTransactions: number;
  bankApprovalTransaction: any;
  updateToSAPTransaction: any;
  bankApprovalReference: string;
  bankApprovalAllowed: boolean;
  bankApprovalStatus: string;
  manualUpdateSAPReference: string;
  manualupdateToSAPTransaction: any;
  enableUpdateToSAP: Boolean = false;
  updateToSAPStatus: String = '';

  tppaDetails: any = [];

  @Input() showLoader: boolean;
  @Input() transactions: any;
  @Input() transactionsList: any;
  @Input() transactionsListWithPagination: any;
  @Input() pageTopStatus: string;


  @ViewChild('transactionHistoryModel') transactionHistoryModel: ElementRef;
  @ViewChild('transactionHistoryModalBackdrop') transactionHistoryModalBackdrop: ElementRef;

  @ViewChild('updateToSAPModal') updateToSAPModal: ElementRef;
  @ViewChild('manualUpdateToSAPModal') manualUpdateToSAPModal: ElementRef;

  constructor(private yoda: YodaService, private tppaPayBase: TppaPaymentBaseService) {
    this.transactions = {};
    this.pageTopStatus = 'Page Top';
    this.failedTransactions = 0;
    this.bankApprovalReference = '';
  }

  ngOnInit() {
    this.historyTransaction = {};
    this.bankApprovalTransaction = {};
  }



  showTransactionHistory(transaction, id) {
    this.showLoader = true;

    this.historyTransaction = transaction;
    this.tppaPayBase.getTPPAPaymentsDetails(id).subscribe((data: any) => {
      console.log('tppaDetails -> data', data);
      this.showLoader = false;
      this.tppaDetails = data;
      console.log('tppaDetails -> tppaDetails', this.tppaDetails);
    })
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.transactionHistoryModel.nativeElement.className = 'modal fade show';
    this.transactionHistoryModel.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideTransactionHistory() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.style = 'display: none; padding-right: 17px;';
  }

  showUpdateToSAPModal(transaction) {
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.updateToSAPTransaction = transaction;
    console.log("updateToSAPTransaction", this.updateToSAPTransaction);
    this.updateToSAPModal.nativeElement.className = 'modal fade show';
    this.updateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
    this.enableUpdateToSAP = true;
    this.updateToSAPStatus = '';
  }


  hideUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }

  showManualUpdateToSAPModal(transaction) {
    console.log("Model called", transaction)
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.manualupdateToSAPTransaction = transaction;
    console.log("manualupdateToSAPTransaction", this.manualupdateToSAPTransaction.third_party_payment_app_name)
    this.manualUpdateToSAPModal.nativeElement.className = 'modal fade show';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }


  hideManualUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }

  downloadCSV() {
    let downloadData = [];
    let downloadHeader = {
      PaymentMwscReference: 'MWSC Payment Reference',
      ThirdPartyPaymentAppName: 'Third Party Payment App Name',
      PaymentAccountNo: 'Payment Account No',
      PaymentMeterNo: 'Payment Meter No',
      PaymentAmount: 'Payment Amount',
      PaymentCreatedOn: 'Payment Created On',
      PaymentCreatedOnFriendly: 'Payment Created On Friendly',
      PaymentDueAmount: 'Payment Due Amount',
      PaymentPaidOn: 'Payment Paid On',
      PaymentPaidOnFriendly: 'Payment Paid On Friendly',
      PaymentBalanceAmount: 'Payment Balance Amount',
      PaymentExternalReference: 'Payment External Reference',
      PaymentExternalReferenceUpdatedOn: 'Payment External Reference Updated On',
      PaymentExternalReferenceUpdatedOnFriendly: 'Payment External Reference Updated On Friendly',
      PaymentInternalReference: 'Payment Internal Reference',
      PaymentSapReference: 'Payment Sap Reference',
      PaymentSapReferenceUpdatedOn: 'Payment Sap Reference Updated On',
      PaymentSapReferenceUpdatedOnFriendly: 'Payment Sap Reference Updated On Friendly'
    };

    downloadData.push(downloadHeader);
    console.log("transactionsListWithPagination", this.transactionsListWithPagination);
    console.log("transactionsList", this.transactionsList);
    
    this.transactionsList.forEach(transaction => {
      // console.log("transaction.pageData", transaction.pageData);
      console.log("transaction", transaction);
      

      let downloadLine: any;

      let transaction_payment_internal_reference = '';

      if (transaction.payment_internal_reference === undefined ||
        transaction.payment_internal_reference == null ||
        transaction.payment_internal_reference.length <= 0) {

        transaction_payment_internal_reference = '';
      } else {
        transaction_payment_internal_reference = transaction.payment_internal_reference;
      }

      downloadLine = {
        PaymentMwscReference: transaction.payment_mwsc_reference,
        ThirdPartyPaymentAppName: transaction.third_party_payment_app_name,
        PaymentAccountNo: transaction.payment_account_no,
        PaymentMeterNo: transaction.payment_meter_no,
        PaymentAmount: transaction.payment_amount,
        PaymentCreatedOn: transaction.payment_created_on,
        PaymentCreatedOnFriendly: transaction.payment_created_on_friendly,
        PaymentDueAmount: transaction.payment_due_amount,
        PaymentPaidOn: transaction.payment_paid_on,
        PaymentPaidOnFriendly: transaction.payment_paid_on_friendly,
        PaymentBalanceAmount: transaction.payment_balance_amount,
        PaymentExternalReference: transaction.payment_external_reference,
        PaymentExternalReferenceUpdatedOn: transaction.payment_external_reference_updated_on,
        PaymentExternalReferenceUpdatedOnFriendly: transaction.payment_external_reference_updated_on_friendly,
        PaymentInternalReference: transaction_payment_internal_reference,
        PaymentSapReference: transaction.payment_sap_reference,
        PaymentSapReferenceUpdatedOn: transaction.payment_sap_reference_updated_on,
        PaymentSapReferenceUpdatedOnFriendly: transaction.payment_sap_reference_updated_on_friendly

      };
      downloadData.push(downloadLine);
      console.log("downloadLine", downloadLine);
      
    });
    // tslint:disable-next-line:no-unused-expression
    this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
    var reportTitle = new String('TPPA-Payment ');
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

  // updateToSAPManually(transaction) {
  //   var postData = {
  //     'payment_mwsc_reference': transaction.Transaction_Id,
  //   };

  //   this.yoda.post('Finance/TPPAPayments/UpdateToSAP?payment_mwsc_reference=')
  //     .subscribe(
  //       (data: any) => {
  //         console.log("api date", data);
  //         transaction = data;
  //       },
  //       error => {
  //         this.showError(error);
  //       }
  //     );
  // }

  updateToSAPManually(mwscReference) {
    this.showLoader = true;
    var postData = {
      "payment_mwsc_reference": mwscReference,
      "payment_sap_reference": this.manualUpdateSAPReference
    };
    this.tppaPayBase.postTPPAPaymentsManualUpdateToSAP(postData).subscribe(data => {
      this.showLoader = false;
      this.tppaDetails = data;
      console.log('manualUpdateSAP', this.tppaDetails);
    })
  }

  updateToSAP(mwscReference) {
    console.log("mwscReference", mwscReference);
    this.showLoader = true;
    var postData = {
      "payment_mwsc_reference": mwscReference,
    };
    this.tppaPayBase.postTPPAPaymentsUpdateToSAP(postData).subscribe(data => {
      this.showLoader = false;
      this.tppaDetails = data;
      console.log('UpdateSAP', this.tppaDetails);
    })
  }

}
