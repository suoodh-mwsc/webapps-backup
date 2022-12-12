import { Injectable } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';
import { YodaService } from '../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

declare var Swal: any;

@Injectable()
export class ItadminRootBaseService {

    data: any;

    constructor(private adalService: Adal5Service, private http: HttpClient, private yoda: YodaService) {
    }

    showGtsMsgBox(title, text, time) {
        Swal({
            title: title,
            text: text,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: time,
        });
    }

    showCreateNewMsgBox(title, text, time) {
        Swal({
            title: title,
            text: text,
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: time,
        });
    }


    // **************************************************************************
    // Eservices App Functions
    // **************************************************************************

    // POST XAPI/Account/Disable
    postDisableEserviceUser(DataBody) {
        return this.yoda.post('XAPI/Account/Disable', DataBody);
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}
    getShiftGroupById(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id);
    }

    // GET DutyRoster/ShiftGroups/AssignedToMe
    getShiftGroupsAssignedToMe() {
        return this.yoda.get('DutyRoster/ShiftGroups/AssignedToMe');
    }

}
