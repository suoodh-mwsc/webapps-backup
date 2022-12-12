import { Injectable } from '@angular/core';
// import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { YodaService } from './yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class GlobalService {

    constructor(private http: HttpClient, private yoda: YodaService) { }


    getUser(Id) {
        return this.yoda.get('/Employee/' + Id + '/Details');
    }

    getUserPictureBase64(Id) {
        return this.yoda.get('/Employee/' + Id + '/Picture/Base64');
    }

    // GET My/Details
    getMyDetails() {
        return this.yoda.get('/My/Details');
    }


    // GET Employee/{Id}/Details
    getEmployeeDetailsByEmployeeId(EmployeeId) {
        return this.yoda.get('/Employee/' + EmployeeId + '/Details');
    }

}
