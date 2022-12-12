import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../../environments/environment';
import { YodaService } from '../../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class OnlinePaymentBaseService {

    constructor(private http: HttpClient, private yoda: YodaService) { }





    // **************************************************************************
    // Online Appplication
    // **************************************************************************

    // POST Utility/OnlineApplications/Payments/List
    postOnlineApplicationsPayments(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/Payments/List', DataBody);
    }

}
