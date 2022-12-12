import { Injectable } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { YodaService } from '../../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

declare var Swal: any;

@Injectable()
export class TenderPaymentBaseService {

    dataJson: any = [];

    constructor(
        private adal5Service: Adal5Service,
        private http: HttpClient,
        private yoda: YodaService) { }


    // GET Finance/TenderDocumentPayments/Tenders?PageNumber={PageNumber}&PageSize={PageSize}&Search={Search}
    getTenderDocumentPayments(pageNumber, pageSize, searchValue) {
        let PageNo = pageNumber;
        let PageSize = pageSize;
        console.log('getTenderDocumentPayments PageNumber', pageNumber);
        console.log('getTenderDocumentPayments pageSize', pageSize);
        console.log('getTenderDocumentPayments searchValue', searchValue);

        const params = new HttpParams()
            .set('PageNumber', PageNo)
            .set('PageSize', PageSize)
            .set('Search', searchValue);
        console.log('Finance/TenderDocumentPayments/Tenders -> params', params);
        return this.yoda.get('Finance/TenderDocumentPayments/Tenders', params);
    }

    // GET Finance/TenderDocumentPayments/TransactionsFilteredByDate?filter_by_selected_date={filter_by_selected_date}
    getTenderDocumentPaymentsWithFilteredByDate(selectedDate) {
        console.log('getTenderDocumentPayments selectedDate', selectedDate);

        const params = new HttpParams()
            .set('filter_by_selected_date', selectedDate);
        console.log('getTenderDocumentPaymentsWithFilteredByDate -> params', params);
        return this.yoda.get('Finance/TenderDocumentPayments/TransactionsFilteredByDate', params);
    }


    // GET Finance/TenderDocumentPayments/TransactionsFilteredByTender?filter_by_tender_id={filter_by_tender_id}
    getTenderDocumentPaymentsWithFilteredByTenderId(tenderId) {
        console.log('getTenderDocumentPayments filter_by_tender_id', tenderId);

        const params = new HttpParams()
            .set('filter_by_tender_id', tenderId);
        console.log('getTenderDocumentPaymentsWithFilteredByTender -> params', params);
        return this.yoda.get('Finance/TenderDocumentPayments/TransactionsFilteredByTender', params);
    }



    // https://yoda-dev.mwsc.com.mv/Finance/TenderDocumentPayments/TransactionHistory?payment_id=476
    postTenderDocumentPaymentTransactionHistory(paymentId) {
        const params = new HttpParams()
            .set('payment_id', paymentId);
        console.log('getTenderDocumentPaymentsWithFilteredByTender -> params', params);
        return this.yoda.get('Finance/TenderDocumentPayments/TransactionHistory', params);
    }


    postTenderDocumentPaymentManualUpdateToSAP(postData) {
        console.log('postTenderDocumentPaymentManualUpdateToSAP', postData);
        return this.yoda.post('Finance/TenderDocumentPayments/ManualUpdateToSAP', postData);
    }

    postTenderDocumentPaymentUpdateMarkAsbankApprove(postData) {
        console.log('postTenderDocumentPaymentManualUpdateToSAP', postData);
        return this.yoda.post('Finance/TenderDocumentPayments/MarkAsBankApprovedTransaction', postData);
    }

    postTenderDocumentPaymentUpdateIssueTenderDocument(postData) {
        console.log('postTenderDocumentPaymentManualUpdateToSAP', postData);
        return this.yoda.post('Finance/TenderDocumentPayments/IssueTenderDocument', postData);
    }
}
