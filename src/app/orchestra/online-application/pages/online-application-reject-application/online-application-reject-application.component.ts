import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnlineApplicationBaseService } from './../../../online-application/shared/services/online-application-base.service';
import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-online-application-reject-application',
  templateUrl: './online-application-reject-application.component.html',
  styleUrls: ['./online-application-reject-application.component.scss']
})
export class OnlineApplicationRejectApplicationComponent implements OnInit {

  pdfSrc: String = '/pdf-test.pdf';
  PDFurl: SafeResourceUrl;

  showLoader: boolean;

  showPendingList: boolean;
  showSelectedApplication: boolean;
  pendingApplications: any = [];
  pendingApplicationsPaginationInfo: any = [];
  allPendingApplicationList: any = [];
  newOnlineApplicationInCompleteReason: any;

  SalesOrderNo: any;
  selectedApplication: any = [];
  updateOnlineApplication: any = [];              // Update OnlineApplication - Reject
  // updateOnlineApplicationReason: any = [];     // Update OnlineApplication - Reject
  updateOnlineApplicationReason: any;             // Update OnlineApplication - Reject
  showReject: boolean;
  showApprove: boolean;

  newApplication: any = [];
  inCompleteReasons: any = [];
  pendingApplicationsDocuments: any = [];
  applicationMWSCRemarks: any;

  setClickedRow: Function;

  constructor(
    private domSanitizer: DomSanitizer,
    private onlineAppBase: OnlineApplicationBaseService) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };

    this.getPendingApplications(5, 1);
    this.showReject = false;
    this.showApprove = false;
    this.selectedApplication = [];
    this.showPendingList = true;
    this.showSelectedApplication = false;
    // this.inCompleteReasons = [
    //   { id: 1, description: 'Invalid ID Card' },
    //   { id: 2, description: 'Expired ID Card' },
    //   { id: 3, description: 'Unclear ID Card' },
    //   { id: 4, description: 'Invalid ID Land Registry' },
    //   { id: 5, description: 'Expired ID Land Registry' },
    //   { id: 6, description: 'Unclear ID Land Registry' },
    //   { id: 7, description: 'Sample text to make reason text very lengthy. Sample text to make reason text very lengthy. Sample text to make reason text very lengthy. Sample text to make reason text very lengthy. Sample text to make reason text very lengthy. ' },
    // ];
    // console.log('Incomplete Reasons -> inCompleteReasons', this.inCompleteReasons);

    // this.UserFriendlyStatus();
  }

  ngOnInit() {
  }


  getPDF(Document) {
    console.log(Document);
    this.PDFurl = this.domSanitizer.bypassSecurityTrustResourceUrl(Document.File.File);
  }


  getPendingApplications(pageSize, pageNum) {
    this.showLoader = true;
    this.allPendingApplicationList.ShowDeleted = true;
    this.allPendingApplicationList.PageSize = pageSize;
    this.allPendingApplicationList.PageNumber = pageNum;
    this.onlineAppBase.postUtilityOnlineApplicationsPending(
      {
        'PageSize': this.allPendingApplicationList.PageSize,
        'PageNumber': this.allPendingApplicationList.PageNumber
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getPendingApplications data', data);
      this.pendingApplicationsPaginationInfo = data.PaginationInfo;
      data.UtilityApplications.forEach(element => {
        this.pendingApplications.push(element);
        // if (this.pendingApplications.length > 0) {
        //   setTimeout(() => { this.showLoader = false; }, 4000);
        // }
      });
      console.log('getPendingApplications - shiftGroups Pagination ->', this.pendingApplicationsPaginationInfo);
      console.log('getPendingApplications - shiftGroups Data ->', this.pendingApplications);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }


  viewSelectedApplication(OnlineApplication) {
    if (OnlineApplication.Documents.length > 0) {
      OnlineApplication.Documents.forEach(element => {
        let byteCharacters = atob(element.File.File);
        let byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        let byteArray = new Uint8Array(byteNumbers);
        let blob = new Blob([byteArray], { type: element.File.FileType.Title });
        element.SafeFile = this.domSanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      });
    }

    this.selectedApplication = OnlineApplication;
    this.updateOnlineApplication.SalesOrderNo = null;
    this.updateOnlineApplication.InCompleteReason = null;
    this.hideApproveSalesOrderNo();
    this.hideRejectReason();
    this.showPendingList = false;
    this.showSelectedApplication = true;
  }


  viewPendingApplicationList() {
    if (this.pendingApplications.length < 1) {
      this.pendingApplications = [];
      this.getPendingApplications(5, 1);
    } else {
      this.pendingApplications = [];
      this.getPendingApplications(5, 1);
    }
    this.selectedApplication = null;
    this.showPendingList = true;
    this.showSelectedApplication = false;
  }


  showApproveSalesOrderNo(OnlineApplication) {
    this.showApprove = true;
    this.showReject = false;
    this.updateOnlineApplication.SalesOrderNo = null;
  }


  hideApproveSalesOrderNo() {
    this.showApprove = false;
  }


  approve(OnlineApplication) {
    console.log('Approved', OnlineApplication);
    this.onlineAppBase.postOnlineApplicationsApproveByApplicationId(
      {
        'OnlineApplication_Id': OnlineApplication.Id,
        'SalesOrderNo': this.updateOnlineApplication.SalesOrderNo
      }
    )
      .subscribe((data) => {
        this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Updated Status of Online Application to Approved', 1000);
        console.log('approve', data);
        OnlineApplication.CurrentStage = 3;
        OnlineApplication.CurrentStageDescription = 'Completed';
        OnlineApplication.SalesOrderNo = this.SalesOrderNo;
        this.showApprove = false;
        this.viewPendingApplicationList();
      },
        (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
  }


  showRejectReason(OnlineApplication) {
    this.showApprove = false;
    this.showReject = true;
    this.updateOnlineApplication.Reason = null;
  }


  hideRejectReason() {
    this.showReject = false;
  }


  rejectOld(selectedOnlineApplication, applicationRejectReason) {
    console.log('Reject', selectedOnlineApplication);
    console.log('Reject -> selectedOnlineApplication', selectedOnlineApplication.Id);
    console.log('Reject -> applicationRejectReason', applicationRejectReason.Id);
    this.onlineAppBase.postUtilityOnlineApplicationsReject(
      {
        'OnlineApplication_Id': selectedOnlineApplication.Id,
        'UtilityOnlineApplicationStatus_Id': applicationRejectReason.Id
      }
    )
      .subscribe((data) => {
        this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Updated Status of Online Application to Incomplete', 1000);
        console.log('reject', data);
        selectedOnlineApplication.CurrentStage = 1;
        selectedOnlineApplication.CurrentStageDescription = 'Incomplete';
        selectedOnlineApplication.Remarks = applicationRejectReason.UserFriendlyStatus;
        this.showReject = false;
        this.viewPendingApplicationList();
      },
        (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
  }


  remarks(selectedOnlineApplication) {
    console.log('Reject', selectedOnlineApplication);
    this.onlineAppBase.postUtilityOnlineApplicationsMWSCRemarks(
      {
        'OnlineApplication_Id': selectedOnlineApplication.Id,
        'Reason': selectedOnlineApplication.MWSCRemarks
      }
    )
      .subscribe((data) => {
        this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Updated Remarks of Online Application', 1000);
        console.log('reject', data);
        // selectedOnlineApplication.CurrentStage = 1;
        // selectedOnlineApplication.CurrentStageDescription = 'Incomplete';
        this.showReject = false;
        this.reject(selectedOnlineApplication); // Reject
      },
        (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
  }

  reject(selectedOnlineApplication) {
    console.log('Reject', selectedOnlineApplication);
    this.onlineAppBase.postUtilityOnlineApplicationsReject(
      {
        'OnlineApplication_Id': selectedOnlineApplication.Id,
      }
    )
      .subscribe((data) => {
        this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Updated Application Status to Incomplete', 1000);
        console.log('reject', data);
        this.getPendingApplications(5, 1);
        // selectedOnlineApplication.CurrentStage = 1;
        selectedOnlineApplication.CurrentStageDescription = 'Incomplete';
        this.showReject = false;
      },
        (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
  }

  UserFriendlyStatus() {
    this.onlineAppBase.getOnlineApplicationsStatusList().subscribe((data) => {
      this.inCompleteReasons = data;
      console.log('UserFriendlyStatus', data);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }


  addToRemarks(selectedOnlineApplication, incompleteReason) {
    console.log('addToRemarks', incompleteReason);
    this.updateOnlineApplicationReason.push(incompleteReason);
    // this.reject(selectedOnlineApplication, incompleteReason);         // Reject
    this.inCompleteReasons.forEach(reason => {
      if (reason.Id === incompleteReason.Id) {
        var removeIndex = this.inCompleteReasons.indexOf(reason);
        this.inCompleteReasons.splice(removeIndex, 1);
      }
    });
    console.log('addToRemarks -> updateOnlineApplicationReason', this.updateOnlineApplicationReason);
    this.applicationMWSCRemarks = null;
  }


  removeRemarks(incompleteReason) {
    console.log('removeRemarks', incompleteReason);
    this.inCompleteReasons.push(incompleteReason);
    this.updateOnlineApplicationReason.forEach(removeResonItem => {
      if (removeResonItem.Id === incompleteReason.Id) {
        var removeIndex = this.updateOnlineApplicationReason.indexOf(removeResonItem);
        this.updateOnlineApplicationReason.splice(removeIndex, 1);
      }
    });
  }


  getApplication(OnlineApplication) {
    this.updateOnlineApplication = OnlineApplication;
  }

}
