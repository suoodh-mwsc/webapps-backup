import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
// import { TppaPaymentBaseService } from '../../../shared/services/tppa-payment-base.service';
import { TenderPaymentBaseService } from '../../../shared/services/tender-payment-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-tender-payment-transactions',
  templateUrl: './tender-payment-transactions.component.html',
  styleUrls: ['./tender-payment-transactions.component.scss']
})
export class TenderPaymentTransactionsComponent implements OnInit {

  nowDateTime: any;

  // IssueTenderDocument - Model
  issueTenderDocument: any;
  tenderPaymentAdditionalRemark: any;

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

  paymentDetails: any = [];

  @Input() showLoader: boolean;
  @Input() transactions: any;
  @Input() transactionsList: any;
  @Input() transactionsListWithPagination: any;
  @Input() viewType: any;
  @Input() pageTopStatus: string;


  @ViewChild('transactionHistoryModel') transactionHistoryModel: ElementRef;
  @ViewChild('transactionHistoryModalBackdrop') transactionHistoryModalBackdrop: ElementRef;

  @ViewChild('updateToSAPModal') updateToSAPModal: ElementRef;
  @ViewChild('manualUpdateToSAPModal') manualUpdateToSAPModal: ElementRef;
  @ViewChild('banksApprovalModal') banksApprovalModal: ElementRef;

  @ViewChild('issueTenderDocumentModel') issueTenderDocumentModel: ElementRef;


  constructor(private yoda: YodaService, private tenderPayBase: TenderPaymentBaseService) {
    this.transactions = {};
    this.pageTopStatus = 'Page Top';
    this.failedTransactions = 0;
    this.bankApprovalReference = '';
  }

  ngOnInit() {
    this.historyTransaction = {};
    this.bankApprovalTransaction = {};
  }



  showTransactionHistory(transaction, payment_id) {
    this.historyTransaction = [];
    this.showLoader = true;
    this.historyTransaction = transaction;
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.transactionHistoryModel.nativeElement.className = 'modal fade show';
    this.transactionHistoryModel.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideTransactionHistory() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.style = 'display: none; padding-right: 17px;';
    this.historyTransaction = [];
  }


  showIssueTenderDocument(transaction, payment_id) {
    this.issueTenderDocument = [];
    this.showLoader = true;
    this.issueTenderDocument = transaction;
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.issueTenderDocumentModel.nativeElement.className = 'modal fade show';
    this.issueTenderDocumentModel.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideIssueTenderDocument() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.issueTenderDocumentModel.nativeElement.className = '';
    this.issueTenderDocumentModel.nativeElement.style = 'display: none; padding-right: 17px;';
    this.issueTenderDocument = [];
  }


  showUpdateToSAPModal(transaction) {
    this.updateToSAPTransaction = [];
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
    this.updateToSAPTransaction = [];
  }

  showManualUpdateToSAPModal(transaction) {
    this.manualupdateToSAPTransaction = [];
    console.log("Model called", transaction)
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.manualupdateToSAPTransaction = transaction;
    console.log("manualupdateToSAPTransaction", this.manualupdateToSAPTransaction)
    this.manualUpdateToSAPModal.nativeElement.className = 'modal fade show';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }


  hideManualUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
    this.manualupdateToSAPTransaction = [];
  }

  showBanksApprovalModal(transaction) {
    this.bankApprovalTransaction = [];
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.bankApprovalReference = '';
    this.bankApprovalAllowed = true;
    this.bankApprovalTransaction = transaction;
    this.banksApprovalModal.nativeElement.className = 'modal fade show';
    this.banksApprovalModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideBanksApprovalModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.banksApprovalModal.nativeElement.className = '';
    this.banksApprovalModal.nativeElement.style = 'display: none; padding-right: 17px;';
    this.bankApprovalTransaction = [];
  }


  bankApproval(tenderPayment, bankReference) {
    if (bankReference.length === 0) {
      alert('Enter a bank reference');
    } else {
      this.bankApprovalAllowed = false;
      this.bankApprovalStatus = 'Please wait ...';
      console.log("tenderPayment", tenderPayment);
      this.showLoader = true;
      var postData = {
        "payment_id": tenderPayment.payment_id,
        "payment_gateway_reference": tenderPayment.payment_gateway_reference,
      };

      this.tenderPayBase.postTenderDocumentPaymentUpdateMarkAsbankApprove(postData).subscribe(data => {
        this.showLoader = false;
        this.paymentDetails = data;
        console.log('UpdateSAP', this.paymentDetails);
      }, error => {
        this.showError(error);
        this.bankApprovalStatus = 'An Error Occurred';
        this.bankApprovalAllowed = true;
      });

    }
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
    this.transactionsList.forEach(transaction => {
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



  updateToSAPManually(tenderPayment) {
    this.showLoader = true;
    var postData = {
      "payment_id": tenderPayment.payment_id,
      "payment_sap_reference": this.manualUpdateSAPReference
    };
    this.tenderPayBase.postTenderDocumentPaymentManualUpdateToSAP(postData).subscribe(data => {
      this.showLoader = false;
      this.paymentDetails = data;
      console.log('updateToSAPManually', this.paymentDetails);

      this.yoda.showYodaErrorMsg('Payment Updated', 'Payment Updated Successfully');


      if (data) {
        tenderPayment.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
        tenderPayment.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
        tenderPayment.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
        tenderPayment.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
        tenderPayment.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
        tenderPayment.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
        tenderPayment.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
        tenderPayment.payment_id = this.paymentDetails.payment_id;
        tenderPayment.payment_is_successful = this.paymentDetails.payment_is_successful;
        tenderPayment.payment_our_reference = this.paymentDetails.payment_our_reference;
        tenderPayment.payment_paid_by = this.paymentDetails.payment_paid_by;
        tenderPayment.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
        tenderPayment.payment_sap_reference = this.paymentDetails.payment_sap_reference;
        tenderPayment.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
        tenderPayment.payment_status_friendly = this.paymentDetails.payment_status_friendly;
        tenderPayment.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
        tenderPayment.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
        tenderPayment.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
        tenderPayment.tender_id = this.paymentDetails.tender_id;
        tenderPayment.tender_is_published = this.paymentDetails.tender_is_published;
        tenderPayment.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
        tenderPayment.tender_reference_no = this.paymentDetails.tender_reference_no;
        tenderPayment.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
        tenderPayment.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
        tenderPayment.tender_title = this.paymentDetails.tender_title;
      }

      // this.transactions.forEach(ele => {
      //   if (ele.payment_id === tenderPayment.payment_id) {
      //     ele.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
      //     ele.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
      //     ele.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
      //     ele.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
      //     ele.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
      //     ele.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
      //     ele.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
      //     ele.payment_id = this.paymentDetails.payment_id;
      //     ele.payment_is_successful = this.paymentDetails.payment_is_successful;
      //     ele.payment_our_reference = this.paymentDetails.payment_our_reference;
      //     ele.payment_paid_by = this.paymentDetails.payment_paid_by;
      //     ele.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
      //     ele.payment_sap_reference = this.paymentDetails.payment_sap_reference;
      //     ele.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
      //     ele.payment_status_friendly = this.paymentDetails.payment_status_friendly;
      //     ele.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
      //     ele.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
      //     ele.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
      //     ele.tender_id = this.paymentDetails.tender_id;
      //     ele.tender_is_published = this.paymentDetails.tender_is_published;
      //     ele.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
      //     ele.tender_reference_no = this.paymentDetails.tender_reference_no;
      //     ele.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
      //     ele.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
      //     ele.tender_title = this.paymentDetails.tender_title;
      //   }
      // });


      this.hideManualUpdateToSAPModal();
    });
  }


  updateToSAP(tenderPayment) {
    console.log("tenderPayment", tenderPayment);
    this.showLoader = true;
    var postData = {
      "payment_id": tenderPayment.payment_id,
      "payment_gateway_reference": tenderPayment.payment_gateway_reference,
    };
    this.tenderPayBase.postTenderDocumentPaymentUpdateMarkAsbankApprove(postData).subscribe(data => {
      this.showLoader = false;
      this.paymentDetails = data;
      console.log('UpdateSAP', this.paymentDetails);
      this.yoda.showYodaErrorMsg('Payment Updated', 'Payment Updated Successfully');

      if (data) {
        tenderPayment.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
        tenderPayment.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
        tenderPayment.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
        tenderPayment.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
        tenderPayment.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
        tenderPayment.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
        tenderPayment.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
        tenderPayment.payment_id = this.paymentDetails.payment_id;
        tenderPayment.payment_is_successful = this.paymentDetails.payment_is_successful;
        tenderPayment.payment_our_reference = this.paymentDetails.payment_our_reference;
        tenderPayment.payment_paid_by = this.paymentDetails.payment_paid_by;
        tenderPayment.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
        tenderPayment.payment_sap_reference = this.paymentDetails.payment_sap_reference;
        tenderPayment.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
        tenderPayment.payment_status_friendly = this.paymentDetails.payment_status_friendly;
        tenderPayment.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
        tenderPayment.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
        tenderPayment.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
        tenderPayment.tender_id = this.paymentDetails.tender_id;
        tenderPayment.tender_is_published = this.paymentDetails.tender_is_published;
        tenderPayment.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
        tenderPayment.tender_reference_no = this.paymentDetails.tender_reference_no;
        tenderPayment.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
        tenderPayment.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
        tenderPayment.tender_title = this.paymentDetails.tender_title;
      }

      // this.transactions.forEach(ele => {
      //   if (ele.payment_id === tenderPayment.payment_id) {
      //     ele.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
      //     ele.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
      //     ele.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
      //     ele.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
      //     ele.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
      //     ele.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
      //     ele.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
      //     ele.payment_id = this.paymentDetails.payment_id;
      //     ele.payment_is_successful = this.paymentDetails.payment_is_successful;
      //     ele.payment_our_reference = this.paymentDetails.payment_our_reference;
      //     ele.payment_paid_by = this.paymentDetails.payment_paid_by;
      //     ele.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
      //     ele.payment_sap_reference = this.paymentDetails.payment_sap_reference;
      //     ele.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
      //     ele.payment_status_friendly = this.paymentDetails.payment_status_friendly;
      //     ele.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
      //     ele.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
      //     ele.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
      //     ele.tender_id = this.paymentDetails.tender_id;
      //     ele.tender_is_published = this.paymentDetails.tender_is_published;
      //     ele.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
      //     ele.tender_reference_no = this.paymentDetails.tender_reference_no;
      //     ele.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
      //     ele.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
      //     ele.tender_title = this.paymentDetails.tender_title;
      //   }
      // });

      this.hideUpdateToSAPModal();
    });
  }


  updateMarkAsBankApprove(tenderPayment) {
    console.log("tenderPayment", tenderPayment);
    this.showLoader = true;
    var postData = {
      "payment_id": tenderPayment.payment_id,
      "payment_gateway_reference": tenderPayment.payment_gateway_reference,
    };
    this.tenderPayBase.postTenderDocumentPaymentUpdateMarkAsbankApprove(postData).subscribe(data => {
      this.showLoader = false;
      this.paymentDetails = data;
      console.log('updateMarkAsBankApprove', this.paymentDetails);
      this.yoda.showYodaErrorMsg('Payment Updated', 'Payment Updated Successfully');

      if (data) {
        tenderPayment.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
        tenderPayment.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
        tenderPayment.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
        tenderPayment.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
        tenderPayment.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
        tenderPayment.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
        tenderPayment.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
        tenderPayment.payment_id = this.paymentDetails.payment_id;
        tenderPayment.payment_is_successful = this.paymentDetails.payment_is_successful;
        tenderPayment.payment_our_reference = this.paymentDetails.payment_our_reference;
        tenderPayment.payment_paid_by = this.paymentDetails.payment_paid_by;
        tenderPayment.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
        tenderPayment.payment_sap_reference = this.paymentDetails.payment_sap_reference;
        tenderPayment.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
        tenderPayment.payment_status_friendly = this.paymentDetails.payment_status_friendly;
        tenderPayment.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
        tenderPayment.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
        tenderPayment.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
        tenderPayment.tender_id = this.paymentDetails.tender_id;
        tenderPayment.tender_is_published = this.paymentDetails.tender_is_published;
        tenderPayment.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
        tenderPayment.tender_reference_no = this.paymentDetails.tender_reference_no;
        tenderPayment.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
        tenderPayment.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
        tenderPayment.tender_title = this.paymentDetails.tender_title;
      }

      // this.transactions.forEach(ele => {
      //   if (ele.payment_id === tenderPayment.payment_id) {
      //     ele.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
      //     ele.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
      //     ele.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
      //     ele.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
      //     ele.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
      //     ele.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
      //     ele.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
      //     ele.payment_id = this.paymentDetails.payment_id;
      //     ele.payment_is_successful = this.paymentDetails.payment_is_successful;
      //     ele.payment_our_reference = this.paymentDetails.payment_our_reference;
      //     ele.payment_paid_by = this.paymentDetails.payment_paid_by;
      //     ele.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
      //     ele.payment_sap_reference = this.paymentDetails.payment_sap_reference;
      //     ele.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
      //     ele.payment_status_friendly = this.paymentDetails.payment_status_friendly;
      //     ele.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
      //     ele.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
      //     ele.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
      //     ele.tender_id = this.paymentDetails.tender_id;
      //     ele.tender_is_published = this.paymentDetails.tender_is_published;
      //     ele.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
      //     ele.tender_reference_no = this.paymentDetails.tender_reference_no;
      //     ele.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
      //     ele.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
      //     ele.tender_title = this.paymentDetails.tender_title;
      //   }
      // });

    });
  }


  updateIssueTenderDocument(tenderPayment) {
    console.log("tenderPayment", tenderPayment);
    this.showLoader = true;
    var postData = {
      "payment_id": tenderPayment.payment_id,
      "additional_remark": this.tenderPaymentAdditionalRemark,
    };
    this.tenderPayBase.postTenderDocumentPaymentUpdateIssueTenderDocument(postData).subscribe(data => {
      this.showLoader = false;
      this.paymentDetails = data;
      console.log('updateIssueTenderDocument', this.paymentDetails);
      this.yoda.showYodaErrorMsg('Tender Document Issued', 'Tender Document Issued Successfully');

      if (data) {
        tenderPayment.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
        tenderPayment.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
        tenderPayment.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
        tenderPayment.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
        tenderPayment.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
        tenderPayment.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
        tenderPayment.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
        tenderPayment.payment_id = this.paymentDetails.payment_id;
        tenderPayment.payment_is_successful = this.paymentDetails.payment_is_successful;
        tenderPayment.payment_our_reference = this.paymentDetails.payment_our_reference;
        tenderPayment.payment_paid_by = this.paymentDetails.payment_paid_by;
        tenderPayment.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
        tenderPayment.payment_sap_reference = this.paymentDetails.payment_sap_reference;
        tenderPayment.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
        tenderPayment.payment_status_friendly = this.paymentDetails.payment_status_friendly;
        tenderPayment.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
        tenderPayment.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
        tenderPayment.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
        tenderPayment.tender_id = this.paymentDetails.tender_id;
        tenderPayment.tender_is_published = this.paymentDetails.tender_is_published;
        tenderPayment.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
        tenderPayment.tender_reference_no = this.paymentDetails.tender_reference_no;
        tenderPayment.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
        tenderPayment.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
        tenderPayment.tender_title = this.paymentDetails.tender_title;
      }

      // this.transactions.forEach(ele => {
      //   if (ele.payment_id === tenderPayment.payment_id) {
      //     ele.can_issue_tender_document = this.paymentDetails.can_issue_tender_document;
      //     ele.can_manually_update_to_sap = this.paymentDetails.can_manually_update_to_sap;
      //     ele.can_mark_as_bank_approved_transaction = this.paymentDetails.can_mark_as_bank_approved_transaction;
      //     ele.payment_amount_friendly = this.paymentDetails.payment_amount_friendly;
      //     ele.payment_gateway_friendly = this.paymentDetails.payment_gateway_friendly;
      //     ele.payment_gateway_reference = this.paymentDetails.payment_gateway_reference;
      //     ele.payment_gateway_response_description = this.paymentDetails.payment_gateway_response_description;
      //     ele.payment_id = this.paymentDetails.payment_id;
      //     ele.payment_is_successful = this.paymentDetails.payment_is_successful;
      //     ele.payment_our_reference = this.paymentDetails.payment_our_reference;
      //     ele.payment_paid_by = this.paymentDetails.payment_paid_by;
      //     ele.payment_paid_on_friendly = this.paymentDetails.payment_paid_on_friendly;
      //     ele.payment_sap_reference = this.paymentDetails.payment_sap_reference;
      //     ele.payment_sap_updated_on_friendly = this.paymentDetails.payment_sap_updated_on_friendly;
      //     ele.payment_status_friendly = this.paymentDetails.payment_status_friendly;
      //     ele.payment_tender_document_issued_on_friendly = this.paymentDetails.payment_tender_document_issued_on_friendly;
      //     ele.tender_announce_from_friendly = this.paymentDetails.tender_announce_from_friendly;
      //     ele.tender_announce_to_friendly = this.paymentDetails.tender_announce_to_friendly;
      //     ele.tender_id = this.paymentDetails.tender_id;
      //     ele.tender_is_published = this.paymentDetails.tender_is_published;
      //     ele.tender_published_on_friendly = this.paymentDetails.tender_published_on_friendly;
      //     ele.tender_reference_no = this.paymentDetails.tender_reference_no;
      //     ele.tender_selling_price_friendly = this.paymentDetails.tender_selling_price_friendly;
      //     ele.tender_submission_deadline_friendly = this.paymentDetails.tender_submission_deadline_friendly;
      //     ele.tender_title = this.paymentDetails.tender_title;
      //   }
      // });

      this.hideIssueTenderDocument();
    });
  }



}
