import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { YodaService } from '../../../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare var Swal: any;

@Component({
  selector: 'app-online-payment-transaction',
  templateUrl: './online-payment-transaction.component.html',
  styleUrls: ['./online-payment-transaction.component.scss']
})
export class OnlinePaymentTransactionComponent implements OnInit {

  @ViewChild('transactionHistoryModel') transactionHistoryModel: ElementRef;
  @ViewChild('transactionHistoryModalBackdrop') transactionHistoryModalBackdrop: ElementRef;

  @ViewChild('banksApprovalModal') banksApprovalModal: ElementRef;
  @ViewChild('updateToSAPModal') updateToSAPModal: ElementRef;
  @ViewChild('manualUpdateToSAPModal') manualUpdateToSAPModal: ElementRef;

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
  enableUpdateToSAP: Boolean = false;
  updateToSAPStatus: String = '';

  constructor(private yoda: YodaService) {
    this.transactions = {};
    this.pageTopStatus = 'Page Top';
    this.failedTransactions = 0;
    this.bankApprovalReference = '';

  }

  ngOnInit() {
    this.historyTransaction = {};
    this.bankApprovalTransaction = {};
  }

  // transactionsNotUpdatedToSAP() {
  //   this.title = 'Transactions not updated to SAP';
  //   this.yoda.get('Utility/OnlinePayments/NotUploadedToSAP')
  //     .subscribe(data => {
  //       this.transactions = data;
  //       console.log(data);
  //     });
  // }
// ]}}}


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
        'Transaction_Id': transaction.Transaction_Id,
        'BanksReferenceNo': bankReference
      };
      this.yoda.post('Finance/OnlinePayments/BankApprovedTransaction', postData)
        .subscribe(
          data => {
            transaction.Transaction = data;
            this.bankApprovalStatus = '';
            this.bankApprovalAllowed = true;
          },
          error => {
            this.showError(error);
            this.bankApprovalStatus = 'An Error Occurred';
            this.bankApprovalAllowed = true;
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
    this.transactions.forEach(transaction => {
      let downloadLine: any;
      downloadLine = {
        OurReference: transaction.Transaction.OurReference,
        gateway: transaction.Transaction.PaymentGatewayDescription,
        BankReference: transaction.Transaction.BanksReferenceNo,
        PaymentTypeDescription: transaction.Transaction.PaymentTypeDescription,
        AccountNo: transaction.AccountNo,
        MeterNo: transaction.MeterNo,
        PaidOn: transaction.Transaction.PaidOn,
        PaymentAmount: transaction.Transaction.PaymentAmount,
        IsSuccessful: transaction.Transaction.IsSuccessful,
        SAPReference: transaction.Transaction.SAPReference,
        UpdatedToSAPOn: transaction.Transaction.UpdatedToSAPOn
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
        if (transaction.Transaction.IsSuccessful) {
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
    this.enableUpdateToSAP = true;
    this.updateToSAPStatus = '';
  }


  hideUpdateToSAPModal() {
    this.transactionHistoryModalBackdrop.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.className = '';
    this.updateToSAPModal.nativeElement.style = 'display: none; padding-right: 17px;';
  }


  updateToSAP(transaction) {
    this.enableUpdateToSAP = false;
    this.updateToSAPStatus = 'Please Wait ... ';
    var postData = {
      'Transaction_Id': transaction.Transaction_Id,
    };

    this.yoda.post('Finance/OnlinePayments/UpdateToSAP', postData)
      .subscribe(
        (data: any) => {
          transaction.Transaction = data.Transaction;
          this.bankApprovalStatus = '';
          this.bankApprovalAllowed = true;
          // location.reload();
        },
        error => {
          this.showError(error);
          this.bankApprovalStatus = 'An Error Occured';
          this.bankApprovalAllowed = true;
          this.updateToSAPStatus = '';
        }
      );
  }

  showAllSuccessful() {
    if (JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.Transaction.IsSuccessful === true).length !== 0) {
      this.transactions = JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.Transaction.IsSuccessful === true);
    }

  }
  showUnSuccessful() {
    if (JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.Transaction.IsSuccessful === false).length !== 0) {
      this.transactions = JSON.parse(localStorage.getItem('allTransactions')).filter(transaction => transaction.Transaction.IsSuccessful === false);
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


  updateToSAPManually(transaction) {
    var postData = {
      'Transaction_Id': transaction.Transaction_Id,
      'SAPReference': this.manualUpdateSAPReference
    };

    this.yoda.post('Finance/OnlinePayments/ManualUpdateToSAP', postData)
      .subscribe(
        (data: any) => {
          transaction = data;
        },
        error => {
          this.showError(error);
        }
      );
  }


}
