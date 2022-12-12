import { Component, OnInit } from '@angular/core';
// import { GtsGlobalService } from './../shared/services/gts-global.service';
// import { NfcGuardPatrolBaseService } from './../shared/services/nfc-guard-patrol-base.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-e-service-home',
  templateUrl: './e-service-home.component.html',
  styleUrls: ['./e-service-home.component.scss']
})
export class EServiceHomeComponent implements OnInit {

  private SearchEmployeeId: string;
  private employee: any;
  private employeePictureBase64: any;

  public myDetails: any[];
  public myId: any;
  public myDomainId: any;
  public myName: any;
  public myMobileNumber: any;
  public myEmail: any;
  public myDesignation: any;
  public myDivision: any;
  public myDepartment: any;
  public mySection: any;

  constructor(
    // private nfcGuardPatrolBaseService: NfcGuardPatrolBaseService,
    // private gtsGlobalService: GtsGlobalService,
    private sanitizer: DomSanitizer) {
    this.getMyDetails();
  }

  ngOnInit() {
  }

  public getMyDetails() {
    this.myDetails = JSON.parse(localStorage.getItem('localStorageMyProfile'));

    this.employeePictureBase64 = localStorage.getItem('myProfilePictureBase64');
  }

}
