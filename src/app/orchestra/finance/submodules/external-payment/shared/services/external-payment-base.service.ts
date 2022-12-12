import { ExternalPaymentSearchComponent } from '../../pages/external-payment-search/external-payment-search.component';
import { Injectable } from '@angular/core';
import { YodaService } from '../../../../../../services/yoda.service';

@Injectable()
export class ExternalPaymentBaseService {

    constructor(private yoda: YodaService) { }


    // Finance - ExternalPayments ------------------------------------------
    // GET Finance/ExternalPayments/Outlets
    getOutlets() {
        return this.yoda.get('Finance/ExternalPayments/Outlets');
    }


    // GET Finance/ExternalPayments/Organizations
    getOrganizations() {
        return this.yoda.get('Finance/ExternalPayments/Organizations');
    }


    // GET Finance/ExternalPayments/PendingDates
    getPendingDates() {
        return this.yoda.get('Finance/ExternalPayments/PendingDates');
    }

    // POST Finance/ExternalPayments/Pending
    getPendingTransactions(takenOn, takenFrom) {
        var postData = {
            'TakenOn': takenOn,
            'OrganizationId': takenFrom
        };
        return this.yoda.post('Finance/ExternalPayments/Pending/ByDate', postData);
    }

    getPendingTransactionsUpdateToSAP(takenOn, takenFrom) {
        var postData = {
            'TakenOn': takenOn,
            'OrganizationId': takenFrom
        };
        return this.yoda.post('Finance/ExternalPayments/Pending/ByDate/UpdateToSAP', postData);
    }


    // POST Finance/ExternalPayments
    getTransactions(takenOn, takenFrom) {
        var postData = {
            'TakenOn': takenOn,
            'OrganizationId': takenFrom
        };
        return this.yoda.post('Finance/ExternalPayments', postData)
    }


    // GET Finance/ExternalPayments/{Id}/Approve
    approveTransaction(transactionId) {
        return this.yoda.get('Finance/ExternalPayments/' + transactionId + '/Approve');
    }

    manuallyupdateToSAP(transaction, SAPReference) {
        var postData = {
            'PaymentTransactionId': transaction.Id,
            'SAPReference': SAPReference
        };
        return this.yoda.post('Finance/ExternalPayments/ManualUpdateToSAP', postData);
    }




    // GET Finance/ExternalPayments/DisableAdminAccount/{UserName}
    getExternalPaymentsViewDisableAdminAccount(UserName) {
        return this.yoda.get('Finance/ExternalPayments/DisableAdminAccount/' + UserName);
    }



    // GET Finance/ExternalPayments/{AccountNo}/Search
    getExternalPaymentsSearchByAccountNo(AccountNo) {
        return this.yoda.get('Finance/ExternalPayments/' + AccountNo + '/Search');
    }


    // POST Finance/ExternalPayments/ForDisconnectedMeters
    getDcPaymentTransactions(takenOn, takenFrom) {
        var postData = {
            'TakenOn': takenOn,
            'OrganizationId': takenFrom
        };
        return this.yoda.post('Finance/ExternalPayments/ForDisconnectedMeters', postData);
    }

}
