import { Component, OnInit } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { OnlineApplicationBaseService } from './../../../online-application/shared/services/online-application-base.service';
import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-online-application-quotation-upload',
  templateUrl: './online-application-quotation-upload.component.html',
  styleUrls: ['./online-application-quotation-upload.component.scss']
})
export class OnlineApplicationQuotationUploadComponent implements OnInit {
  showLoader: boolean;

  searchSalesOrderNo: any;

  completedApplications: any = [];
  selectedApplications: any = [];
  setClickedRow: Function;

  constructor(
    private domSanitizer: DomSanitizer,
    private onlineAppBase: OnlineApplicationBaseService) {
    this.selectedApplications = [];
  }


  ngOnInit() {
  }

  searchCompletedOnlineApplicationsBySalesOrderNo(searchSalesOrderNo) {
    this.showLoader = true;
    this.selectedApplications = [];
    console.log('searchCompletedOnlineApplicationsBySalesOrderNo', searchSalesOrderNo);
    this.onlineAppBase.getOnlineApplicationsCompletedBySalesOrderNo(searchSalesOrderNo)
      .subscribe((data) => {
        // this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Updated Status of Online Application to Approved', 1000);
        console.log('searchCompletedOnlineApplicationsBySalesOrderNo', data);
        this.selectedApplications = data;
        this.showLoader = false;
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
  }


  fileChange(event, OnlineApplication) {
    console.log('Files -> ', event.target.files);
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('UploadedFile', file, file.name);
      this.onlineAppBase.postUtilityOnlineApplicationsQuotationUpload(formData, OnlineApplication.Id)
        .subscribe((data) => {
          this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Uploaded Quotation Successfully', 1000);
          console.log('uploadQuotation', data);
        }, (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
    }
  }


  fileChangeNew(event, OnlineApplication) {
    console.log('Files -> ', event.target.files);
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file = fileList[0];
      const formData = new FormData();
      formData.append('UploadedFile', file, file.name);
      this.onlineAppBase.postUtilityOnlineApplicationsQuotationUpload(formData, OnlineApplication.Id)
        .subscribe((data) => {
          this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Uploaded Quotation Successfully', 1000);
          console.log('uploadQuotation', data);
        }, (error: Response | any) => {
          return Observable.throw(new Error(error.status));
        });
    }
  }

  onChange(event: any, OnlineApplication) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('degree_attachment', file, file.name);
      this.onlineAppBase.postUtilityOnlineApplicationsQuotationUpload(formData, OnlineApplication.Id)
        .subscribe((data) => {
          this.onlineAppBase.showCreateNewMsgBox('Hooray!', 'You have Uploaded Quotation Successfully', 1000);
          console.log('uploadQuotation', data);
        },
          (error: Response | any) => {
            return Observable.throw(new Error(error.status));
          });
    }
  }





  viewPendingApplicationList() {

  }





}
