import { Injectable } from '@angular/core';
import { YodaService } from './../../../../services/yoda.service';

declare var Swal: any;

@Injectable()
export class AdminconsoleBaseService {

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


    // **************************************************************************
    // xapi.mwsc.com.mv | Payment
    // **************************************************************************

    // POST Utility/OnlineApplications/Pending
    postUtilityOnlineApplicationsPending(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/Pending', DataBody);
    }

    // GET Utility/OnlineApplications/{OnlineApplication_Id}/Approve
    // getOnlineApplicationsApproveByApplicationId(OnlineApplicationId) {
    //     return this.yoda.get('Utility/OnlineApplications/' + OnlineApplicationId + '/Approve');
    // }

    // GET Payment/PromotionReport
    getPaymentPromotionReport() {
        return this.yoda.get('Payment/PromotionReport');
    }

    // GET Payment/PromotionSelection/{Month}
    getPaymentPromotionSelectionByMonth(Month) {
        return this.yoda.get('Payment/PromotionSelection/' + Month);
    }



}
