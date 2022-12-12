import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-nfc-guard-patrol-home',
  templateUrl: './nfc-guard-patrol-home.component.html',
  styleUrls: ['./nfc-guard-patrol-home.component.scss']
})
export class NfcGuardPatrolHomeComponent implements OnInit {

  public employeePictureBase64: any;
  public myDetails: any[];

  constructor() {
    this.getMyDetails();
  }

  ngOnInit() {
  }

  public getMyDetails() {
    this.myDetails = JSON.parse(localStorage.getItem('localStorageMyProfile'));
    this.employeePictureBase64 = localStorage.getItem('myProfilePictureBase64');
  }

}
