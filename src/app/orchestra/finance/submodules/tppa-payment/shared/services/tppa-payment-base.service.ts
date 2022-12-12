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
export class TppaPaymentBaseService {

    dataJson: any = [];

    sapUploadStatus = false;

    constructor(
        private adal5Service: Adal5Service,
        private http: HttpClient,
        private yoda: YodaService) { }


    // private headerWithToken(searchParams) {
    //     if (this.adal5Service.userInfo.authenticated) {
    //         if (this.adal5Service.userInfo.token) {
    //             // const headersConfig = {
    //             //     'Content-Type': 'application/json',
    //             //     'Accept': 'application/json',
    //             //     'Authorization': 'Bearer ' + this.adal5Service.userInfo.token,
    //             // };
    //             // // console.log('headersConfig.', 'valid Token');

    //             let headers = new HttpHeaders();

    //             const params = new HttpParams()
    //                 .set('filter_by_absence_type_sap_id', searchParams.filter_by_absence_type_sap_id);
    //             // .set('page', searchParams.page)
    //             // .set('page_size', searchParams.page_size)
    //             // .set('search', searchParams.search);

    //             headers = headers
    //                 .set('Content-Type', 'application/json')
    //                 .set('Accept', 'application/json')
    //                 .set('Authorization', `Bearer ${this.adal5Service.userInfo.token}`);
    //             // console.log('headers', headers);

    //             // return new HttpHeaders(headersConfig, params);
    //             return { headers, params };
    //         }
    //     } else {
    //         console.log('TokenHeader :::: ', 'Invalid Token');
    //         console.log(this.adal5Service.userInfo.username, '. TokenHeader :::: You are not logged in. Please log in and try again.');
    //         let title = 'Login Error - You are not logged in';
    //         let text = 'You are not logged in. Please log in and try again.';
    //         this.yoda.showYodaErrorMsg(title, text);
    //         Swal({
    //             title: title,
    //             text: text,
    //             showCancelButton: false,
    //             showConfirmButton: false,
    //             allowOutsideClick: false,
    //             timer: 2000,
    //         }).then(function () {
    //             console.log('TokenHeader ::::', 'Navigate to Login');
    //             this.router.navigate(['/login']);
    //             // this.adal5Service.logOut();
    //             // this.adal5Service.init(environment.adalConfig);
    //             // this.adal5Service.login();

    //             var token = this.adal5Service.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
    //                 console.log('login :::>> Token', token);
    //             });

    //         });
    //     }
    // }


    // private headerWithToken(): HttpHeaders {
    //     if (this.adal5Service.userInfo.authenticated) {
    //         if (this.adal5Service.userInfo.token) {
    //             const headersConfig = {
    //                 'Content-Type': 'application/json',
    //                 'Accept': 'application/json',
    //                 'Authorization': 'Bearer ' + this.adal5Service.userInfo.token,
    //             };
    //             // console.log('headersConfig.', 'valid Token');
    //             return new HttpHeaders(headersConfig);
    //         }
    //     } else {
    //         console.log('TokenHeader :::: ', 'Invalid Token');
    //         console.log(this.adal5Service.userInfo.username, '. TokenHeader :::: You are not logged in. Please log in and try again.');
    //         let title = 'Login Error - You are not logged in';
    //         let text = 'You are not logged in. Please log in and try again.';
    //         this.yoda.showYodaErrorMsg(title, text);
    //         Swal({
    //             title: title,
    //             text: text,
    //             showCancelButton: false,
    //             showConfirmButton: false,
    //             allowOutsideClick: false,
    //             timer: 2000,
    //         }).then(function () {
    //             console.log('TokenHeader ::::', 'Navigate to Login');
    //             this.router.navigate(['/login']);
    //             // this.adal5Service.logOut();
    //             // this.adal5Service.init(environment.adalConfig);
    //             // this.adal5Service.login();

    //             var token = this.adal5Service.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
    //                 console.log('login :::>> Token', token);
    //             });

    //         });
    //     }
    // }



    // get(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {
    //     return this.http.get(`${environment.yodaBase}${path}`, { headers: this.headerWithToken(), params: httpParams })
    //         // .catch(this.handleError)
    //         // .catch((error: any) => {
    //         //   this.showError(error);
    //         //   return Observable.throw(new Error(error.status));
    //         // })
    //         .catch((error: Response | any) => {
    //             var title = 'Error';
    //             var text = 'An error has occured';
    //             console.log('post Req error =>', error);

    //             if (error.status === 400) {
    //                 title = error.error.Message;
    //                 if (error.error.ModelState) {
    //                     text = '';
    //                     for (var key in error.error.ModelState) {
    //                         if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
    //                             text += key.replace('model.', '') + ': ';
    //                             // tslint:disable-next-line:forin
    //                             for (var subkey in error.error.ModelState[key]) {
    //                                 text += error.error.ModelState[key][subkey] + '<br />';
    //                             }
    //                         } else if (error.error.ModelState[key].length > 0) {
    //                             text += key.replace('model.', '') + ': ' + error.error.ModelState[key] + '<br />';
    //                         }
    //                     }
    //                 }
    //             } else if (error.status === 401) {
    //                 title = 'Oh snap!';
    //                 text = 'Authorization has been denied for this request. It seems that your request was Unauthorized (401)';

    //             } else if (error.status === 403) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request was Forbidden (403)';
    //             } else if (error.status === 404) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request was Not found (404)';
    //             } else if (error.status === 405) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request Method Not Allowed (405)';
    //             } else if (error.status === 406) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request Not Acceptable (406)';
    //             } else if (error.status === 412) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request Precondition Failed (412)';
    //             } else if (error.status === 415) {
    //                 title = 'Oh snap!';
    //                 text = 'It seems that your request was Unsupported Media Type (415)';
    //             } else if (error.status === 0 || error.status >= 500) {
    //                 title = 'Oh snap!';
    //                 text = 'Cannot Connect to the Server. Internal Server Error (500)';
    //             }
    //             var options = {
    //                 title: title,
    //                 html: text,
    //                 type: 'error',
    //                 showCancelButton: false,
    //                 allowOutsideClick: false
    //             };
    //             Swal(options);
    //             // return Observable.of(error);
    //             return Observable.throw(new Error(error.status));
    //         })
    //         .map(res => res);
    // }


    // POST Utility/OnlineApplications/Payments/List
    getTppaPaymentsWithOutFilter() {
        // const params = new HttpParams()
        //     .set('page', '1')
        //     .set('page_size', '10')
        //     .set('search_value', '')
        //     .set('filter_pending_sap_upload', 'False')
        //     .set('filter_by_date', '');
        return this.yoda.get('Utility/TPPAPayments');
    }

    getTppaPaymentsWithPaginationFilter(pageNumber, pageSize) {
        let PageNo = pageNumber;
        let PageSize = pageSize;
        const params = new HttpParams()
            .set('page', PageNo)
            .set('page_size', PageSize);
        return this.yoda.get('Utility/TPPAPayments', params);
    }


    getTppaPaymentsPendingsWithPaginationFilter(pageNumber, pageSize, pendingUpload) {
        let PageNo = pageNumber;
        let PageSize = pageSize;
        const params = new HttpParams()
            .set('page', PageNo)
            .set('page_size', PageSize)
            .set('filter_pending_sap_upload', pendingUpload);
        return this.yoda.get('Utility/TPPAPayments', params);
    }



    // POST Utility/OnlineApplications/Payments/List
    getTppaPayments(pageNumber, pageSize, searchValue, pendingUpload, date) {
        let PageNo = pageNumber;
        let PageSize = pageSize;
        console.log('getTppaPayments', this.dataJson);
        console.log('getTppaPayments PageNumber', pageNumber);
        console.log('getTppaPayments PageNumber', pageSize);
        console.log('api searchValue', searchValue);
        console.log('api date', date);

        const params = new HttpParams()
            .set('page', PageNo)
            .set('page_size', PageSize)
            .set('search_value', searchValue)
            .set('filter_pending_sap_upload', pendingUpload)
            .set('filter_by_date', date);
        return this.yoda.get('Utility/TPPAPayments', params);
    }


    // POST Finance/ExternalPayments/Pending
    getPendingTransactions(takenOn, takenFrom) {
        var postData = {
            'TakenOn': takenOn,
            'OrganizationId': takenFrom
        };
        return this.yoda.post('Finance/ExternalPayments/Pending/ByDate', postData);
    }

    // POST Utility/TPPAPayments/Details
    getTPPAPaymentsDetails(id) {
        return this.yoda.get('Utility/TPPAPayments/Details?payment_id=' + id);
    }

    // POST Finance/TPPAPayments/ManualUpdateToSAP
    postTPPAPaymentsManualUpdateToSAP(postData) {
        return this.yoda.post('Finance/TPPAPayments/ManualUpdateToSAP', postData);
    }

    // POST Finance/TPPAPayments/UpdateToSAP
    postTPPAPaymentsUpdateToSAP(postData) {
        console.log("postData", postData.payment_mwsc_reference);
        return this.yoda.post('Finance/TPPAPayments/UpdateToSAP?payment_mwsc_reference=' + postData.payment_mwsc_reference);
    }
}
