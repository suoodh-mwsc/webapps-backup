import { Injectable } from '@angular/core';
import { YodaService } from '../../../../services/yoda.service';
declare var Swal: any;

@Injectable()
export class HrBaseService {

    constructor(private yoda: YodaService) { 
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


    getAttendanceReport(rollcallDate) {
        var postData = {
            'RollCallDate': rollcallDate
        };
        return this.yoda.post('HRDesk/Reports/RollCall', postData);
    }



    // POST Appraisals/HR/DefaultAppraisalTypes
    // {
    //     "SearchValue": "sample string 1",
    //     "PageSize": 2,
    //     "PageNumber": 3
    // }

    postDefaultAppraisalTypes(DataBody){
        return this.yoda.post('Appraisals/HR/DefaultAppraisalTypes', DataBody);
    }

    // POST Appraisals/HR/DefaultAppraisalTypes/Update
    // {
    //     "EmployeeId": "sample string 1",
    //     "OrganizationsAppraisal_Id": 2
    // }
    postDefaultAppraisalTypesUpdate(DataBody){
        return this.yoda.post('Appraisals/HR/DefaultAppraisalTypes/Update', DataBody);
    }


    // GET Appraisals/HR/OrganizationsAppraisals
    getOrganizationsAppraisals() {
        return this.yoda.get('Appraisals/HR/OrganizationsAppraisals');
    }

}
