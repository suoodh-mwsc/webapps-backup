import { Injectable } from '@angular/core';
import { YodaService } from '../../../../../services/yoda.service';

declare var Swal: any;


@Injectable()
export class HrManagementBaseService {

    constructor(private yoda: YodaService) {
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
    // HR Management App Functions
    // **************************************************************************

    // POST HRDesk/Reports/MedicalCertificate/ByYear
    postHRDeskMedicalCertificateByYearReport(DataBody) {
        return this.yoda.post('HRDesk/Reports/MedicalCertificate/ByYear', DataBody);
    }



}
