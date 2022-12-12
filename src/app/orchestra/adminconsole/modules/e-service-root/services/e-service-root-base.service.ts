import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { YodaService } from '../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

declare var Swal: any;


@Injectable()
export class EServiceRootBaseService {

    data: any;

    constructor(private http: HttpClient, private yoda: YodaService) {
    }

    showCreateNewMsgBox(title, text, time) {
        Swal({
          title: title,
          text: text,
          type: "success",
          showCancelButton: false,
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: time
        });
      }
    
      // **************************************************************************
      // Online Application Functions
      // **************************************************************************
    
      // POST Utility/ePortalUser/Find
      postePortalUserSearch(DataBody) {
        return this.yoda.post("Utility/ePortalUser/Find", DataBody);
      }
    
      // POST Utility/ePortalUser/Find
      postePortalUserNotifications(DataBody) {
        return this.yoda.post("XAPI/Account/Notifications", DataBody);
      }
    
      // **************************************************************************
      // Online & External Payments Functions
      // **************************************************************************
    
      // GET Finance/ExternalPayments/{AccountNo}/Search
      getExternalPaymentsSearchByAccountNo(AccountNo) {
        return this.yoda.get("Finance/ExternalPayments/" + AccountNo + "/Search");
      }
    
      // POST Utility/OnlinePayments/ForAccountNo
      postOnlinePaymentsSearchByAccountNo(DataBody) {
        return this.yoda.post("Utility/OnlinePayments/ForAccountNo", DataBody);
      }

}
