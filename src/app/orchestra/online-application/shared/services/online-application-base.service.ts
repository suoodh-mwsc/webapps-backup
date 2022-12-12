import { Injectable } from '@angular/core';
import { YodaService } from '../../../../services/yoda.service';

declare var Swal: any;

@Injectable()
export class OnlineApplicationBaseService {

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
    // Online Application Functions
    // **************************************************************************

    // POST Utility/OnlineApplications/Pending
    postUtilityOnlineApplicationsPending(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/Pending', DataBody);
    }

    // GET Utility/OnlineApplications/{OnlineApplication_Id}/Approve
    // getOnlineApplicationsApproveByApplicationId(OnlineApplicationId) {
    //     return this.yoda.get('Utility/OnlineApplications/' + OnlineApplicationId + '/Approve');
    // }

    // POST Utility/OnlineApplications/Approve
    postOnlineApplicationsApproveByApplicationId(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/Approve', DataBody);
    }

    // POST Utility/OnlineApplications/Reject
    postUtilityOnlineApplicationsReject(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/Reject', DataBody);
    }

    // POST Utility/OnlineApplications/AddMWSCRemarks
    postUtilityOnlineApplicationsMWSCRemarks(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/AddMWSCRemarks', DataBody);
    }


    // POST Utility/OnlineApplications/CustomerServiceStatus/Add
    postUtilityOnlineApplicationsAddStatus(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/CustomerServiceStatus/Add', DataBody);
    }

    // GET Utility/OnlineApplications/CustomerService/Status
    getOnlineApplicationsStatusList() {
        return this.yoda.get('Utility/OnlineApplications/CustomerService/Status');
    }

    // POST Utility/Applications/All
    postUtilityOnlineApplicationsAll(DataBody) {
        return this.yoda.post('Utility/Applications/All', DataBody);
    }

    // POST Utility/OnlineApplications/{OnlineApplication_Id}/QuotationUpload
    postUtilityOnlineApplicationsQuotationUpload(FormData, OnlineApplicationId) {
        return this.yoda.postFile('Utility/OnlineApplications/' + OnlineApplicationId + '/QuotationUpload', FormData);
    }

    // GET Utility/OnlineApplications/SalesOrder/{SalesOrderNo}/Completed
    getOnlineApplicationsCompletedBySalesOrderNo(SalesOrderNo) {
        return this.yoda.get('Utility/OnlineApplications/SalesOrder/' + SalesOrderNo + '/Completed');
    }

    // POST Utility/OnlineApplications/SearchByDate
    postOnlineApplicationsSearchByDate(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/SearchByDate', DataBody);
    }



    // POST Utility/ePortalUser/Find
    postePortalUserSearch(DataBody) {
        return this.yoda.post('Utility/ePortalUser/Find', DataBody);
    }

    // POST Utility/ePortalUser/OnlineApplications
    postePortalUserOnlineApplications(DataBody) {
        return this.yoda.post('Utility/ePortalUser/OnlineApplications', DataBody);
    }


    // POST Utility/OnlineApplications/ByPeriod
    postApplicationsByPeriod(DataBody) {
        return this.yoda.post('Utility/OnlineApplications/ByPeriod', DataBody);
    }




    // **************************************************************************
    // Online & External Payments Functions
    // **************************************************************************

    // GET Finance/ExternalPayments/{AccountNo}/Search
    getExternalPaymentsSearchByAccountNo(AccountNo) {
        return this.yoda.get('Finance/ExternalPayments/' + AccountNo + '/Search');
    }

    // POST Utility/OnlinePayments/ForAccountNo
    postOnlinePaymentsSearchByAccountNo(DataBody) {
        return this.yoda.post('Utility/OnlinePayments/ForAccountNo', DataBody);
    }

}
