import { Injectable } from '@angular/core';
import { YodaService } from '../../../../services/yoda.service';
declare var Swal: any;


@Injectable()
export class SelfCareBaseService {

    constructor(private yoda: YodaService) { }

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

    getDailyRollCallList() {
        return this.yoda.get('Organization/DailyRollCall/List');
    }

    postDailyRollCallUpdate(postData) {
        return this.yoda.post('Organization/DailyRollCall/Update', postData);
    }


    // GET Organization/DailyRollCall/AssingedDivisions
    getAssingedDivisions() {
        return this.yoda.get('Organization/DailyRollCall/AssingedDivisions');
    }

    // GET Organization/DailyDivisionRollCall/{Division_Id}
    getDailyDivisionRollCallReport(DivisionId) {
        return this.yoda.get('Organization/DailyDivisionRollCall/' + DivisionId);
    }



}
