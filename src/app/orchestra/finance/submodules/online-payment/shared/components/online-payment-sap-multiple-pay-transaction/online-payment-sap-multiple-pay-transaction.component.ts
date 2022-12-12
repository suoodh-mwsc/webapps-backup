import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare var Swal: any;
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-online-payment-sap-multiple-pay-transaction',
  templateUrl: './online-payment-sap-multiple-pay-transaction.component.html',
  styleUrls: ['./online-payment-sap-multiple-pay-transaction.component.scss']
})
export class OnlinePaymentSapMultiplePayTransactionComponent implements OnInit {
  @ViewChild('transactionHistoryModel') transactionHistoryModel: ElementRef;
  @ViewChild('transactionHistoryModalBackdrop') transactionHistoryModalBackdrop: ElementRef;

  @ViewChild('banksApprovalModal') banksApprovalModal: ElementRef;
  @ViewChild('updateToSAPModal') updateToSAPModal: ElementRef;
  @ViewChild('manualUpdateToSAPModal') manualUpdateToSAPModal: ElementRef;

  @ViewChild('multipleAccountDetailsSAPModal') multipleAccountDetailsSAPModal: ElementRef;
  @ViewChild('multipleAccountDetailsSAPModalModalBackdrop') multipleAccountDetailsSAPModalModalBackdrop: ElementRef;


  @Input() transactions: any;
  @Input() pageTopStatus: string;

  historyTransaction: any;
  failedTransactions: number;
  bankApprovalTransaction: any;
  updateToSAPTransaction: any;
  bankApprovalReference: string;
  bankApprovalAllowed: boolean;
  bankApprovalStatus: string;

  manualUpdateSAPReference: string;
  manualUpdateToSAPTransaction: any;
  enableUpdateToSapLoader: Boolean = false;
  updateToSAPStatus: String = '';

  selectedTransaction: any = {};
  uploadToSapLoader = false;
  modalTypeSapUpload: boolean;
  modalTypeSapUpdate: boolean;


  modalRefUpload: BsModalRef;
  modalRefUpdate: BsModalRef;
  message: string;
  showLoader: boolean;
  constructor(private yoda: YodaService, private modalService: BsModalService) {
    this.transactions = {};
    this.pageTopStatus = 'Page Top';
    this.failedTransactions = 0;
    this.bankApprovalReference = '';


  }

  ngOnInit() {
    this.historyTransaction = {};
    this.bankApprovalTransaction = {};
  }


  openModalUpload(template: TemplateRef<any>) {
    this.bankApprovalStatus = '';
    this.message = '';
    this.modalRefUpload = this.modalService.show(template, { class: 'modal-sm' });

  }
  openModalUpdate(template: TemplateRef<any>) {
    this.bankApprovalStatus = '';
    this.message = '';
    this.modalRefUpdate = this.modalService.show(template, { class: 'modal-sm' });

  }
  confirmSAPManualUpload(transaction, sapManualUploadReference) {
    this.updateToSAPManually(transaction, sapManualUploadReference);

  }
  confirmSAPAutoUpdate(transaction) {
    this.updateToSAP(transaction);
  }

  confirmBankApproval(transaction, bankApprovalReference) {
    this.bankApproval(transaction, bankApprovalReference);
  }

  declineUpload(): void {
    this.modalRefUpload.hide();
  }

  declineUpdate(): void {
    this.modalRefUpdate.hide();


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

  showTransactionHistory(transaction) {
    this.historyTransaction = transaction;
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.transactionHistoryModel.nativeElement.className = 'modal fade show';
    this.transactionHistoryModel.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideTransactionHistory() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.className = '';
    this.transactionHistoryModel.nativeElement.style = 'display: none; padding-right: 17px;';
  }

  showBanksApprovalModal(transaction) {
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
  }

  bankApproval(transaction, bankReference) {
    if (bankReference.length === 0) {
      alert('Enter a bank reference');
    } else {
      this.bankApprovalAllowed = false;
      this.bankApprovalStatus = 'Please wait ...';
      var postData = {
        'Transaction_Id': transaction.Id,
        'BanksReferenceNo': bankReference
      };
      this.yoda.post('finance/utility-multiple-payments/bank-approved-transaction', postData)
        .subscribe(
          data => {
            // transaction.Transaction = data;
            // this.bankApprovalStatus = '';
            // this.bankApprovalAllowed = true;
            this.modalRefUpload.hide();

            this.showMultipleAccountDetailsSAPModal(data.Transaction)
          },
          error => {
            this.showError(error);
            // this.bankApprovalStatus = 'An Error Occurred';
            // this.bankApprovalAllowed = true;
          }
        );
    }
  }

  downloadCSV() {
    let downloadData = [];
    let downloadHeader = {
      OurReference: 'Our Reference',
      gateway: 'Payment Gateway',
      BankReference: 'Bank Reference',
      PaymentTypeDescription: 'Payment Type',
      AccountNo: 'Account No',
      MeterNo: 'Meter No',
      PaidOn: 'Paid On',
      PaymentAmount: 'Payment Amount',
      IsSuccessful: 'Is Successful',
      SAPReference: 'SAP Reference',
      UpdatedToSAPOn: 'Updated To SAP On',
    };

    downloadData.push(downloadHeader);
    console.log("download kuran ulhey ehchis",this.transactions);
    
    this.transactions.forEach(transaction => {
      let downloadLine: any;
      downloadLine = {
        OurReference: transaction.OurReference,
        gateway: transaction.PaymentGatewayDescription,
        BankReference: transaction.BanksReferenceNo,
        PaymentTypeDescription: transaction.PaymentTypeDescription,
        AccountNo: transaction.AccountNo,
        MeterNo: transaction.MeterNo,
        PaidOn: transaction.PaidOn,
        PaymentAmount: transaction.PaymentAmount,
        IsSuccessful: transaction.IsSuccessful,
        SAPReference: transaction.SAPReference,
        UpdatedToSAPOn: transaction.UpdatedToSAPOn
      };
      downloadData.push(downloadLine);
    });
    // tslint:disable-next-line:no-unused-expression
    new Angular5Csv(downloadData, 'Online-Payments');
  }

  successfulTransactions(transactions) {
    this.failedTransactions = 0;
    if (transactions.length > 0) {
      var count = 0;
      transactions.forEach(transaction => {
        if (transaction.IsSuccessful) {
          count++;
        } else {
          this.failedTransactions++;
        }
      });
      return count;
    }
    return 0;
  }

  showUpdateToSAPModal(transaction) {
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.updateToSAPTransaction = transaction;
    this.updateToSAPModal.nativeElement.className = 'modal fade show';
    this.updateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
    // this.enableUpdateToSAP = true;
    this.updateToSAPStatus = '';
  }

  hideUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }



  showAllSuccessful() {
    if (JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.IsSuccessful === true).length !== 0) {
      this.transactions = JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.IsSuccessful === true);
    }

  }

  showUnSuccessful() {
    if (JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.IsSuccessful === false).length !== 0) {
      this.transactions = JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.IsSuccessful === false);
    }

  }

  showAll() {
    if (JSON.parse(localStorage.getItem('allTransactions')).length !== 0) {
      this.transactions = JSON.parse(localStorage.getItem('allTransactions'));

    }

  }

  showManualUpdateToSAPModal(transaction) {
    this.transactionHistoryModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.manualUpdateToSAPTransaction = transaction;
    this.manualUpdateToSAPModal.nativeElement.className = 'modal fade show';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideManualUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.className = '';
    this.manualUpdateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }
  updateToSAP(transaction) {
    this.message = '';
    this.enableUpdateToSapLoader = true;
    this.updateToSAPStatus = 'Please Wait ... ';
    var postData = {
      'Transaction_Id': transaction.Id,
    };

    this.yoda.post('finance/utility-multiple-payments/update-to-sap', postData)
      .subscribe(
        (data: any) => {
          // this.multipleAccountPayments = data;
          this.enableUpdateToSapLoader = false;
          transaction.Transaction = data.Transaction;
          this.bankApprovalStatus = '';
          this.bankApprovalAllowed = true;
          this.message = 'successful';
          this.hideMultipleAccountDetailsSAPModal();
          this.showMultipleAccountDetailsSAPModal(data.Transaction)
          // this.onlinePaymentPendingSapMultiplePayComponent.getNotUploadedToSap();
          // location.reload();
        },
        error => {
          this.showError(error);

          this.enableUpdateToSapLoader = false;
          this.bankApprovalStatus = 'An Error Occured';
          this.message = '';
          this.bankApprovalAllowed = true;
          this.updateToSAPStatus = '';

        }
      );
  }

  updateToSAPManually(transaction, sapManualUploadReference) {
    this.uploadToSapLoader = true
    this.message = '';
    var postData = {
      'Transaction_Id': transaction.Id,
      'SAPReference': sapManualUploadReference
    };

    this.yoda.post('finance/utility-multiple-payments/manual-update-to-sap', postData)
      .subscribe(
        (data: any) => {
          console.log("data----------------------------->", data);

          this.uploadToSapLoader = false
          // this.multipleAccountPayments = data;
          transaction = data;
          this.message = 'successful';
          this.hideMultipleAccountDetailsSAPModal();
          // this.onlinePaymentPendingSapMultiplePayComponent.getNotUploadedToSap();
          this.showMultipleAccountDetailsSAPModal(data)
        },
        error => {
          this.showError(error);
          this.uploadToSapLoader = false
          this.message = '';
          this.bankApprovalStatus = 'An Error Occured';
        }
      );
  }


  showMultipleAccountDetailsSAPModal(transaction) {
    this.showLoader = true
    this.yoda.get('utility/mutiple-account-payment?transaction_id=' + transaction.Id)
      .subscribe(data => {
        this.selectedTransaction = data;
        this.showLoader = false
        console.log('Search -> MultipleAccountPayments', this.selectedTransaction);
        localStorage.setItem('multiAccountPayments', JSON.stringify(this.selectedTransaction));
        this.pageTopStatus = '';
        this.updateOriginalTransaction(data);
      });


    // this.historyTransaction = transaction;
    this.multipleAccountDetailsSAPModalModalBackdrop.nativeElement.className = 'modal-backdrop fade show';
    this.multipleAccountDetailsSAPModal.nativeElement.className = 'modal fade show';
    this.multipleAccountDetailsSAPModal.nativeElement.style = 'display: block; padding-right: 17px;';
  }

  hideMultipleAccountDetailsSAPModal() {
    this.multipleAccountDetailsSAPModalModalBackdrop.nativeElement.className = '';
    this.multipleAccountDetailsSAPModal.nativeElement.className = '';
    this.multipleAccountDetailsSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';

  }

  updateOriginalTransaction(updatedTransaction) {
    this.transactions.forEach(transaction => {
      if (transaction.Id == updatedTransaction.Id) {        
         Object.assign(transaction, updatedTransaction);
      }
    });
  }




}
