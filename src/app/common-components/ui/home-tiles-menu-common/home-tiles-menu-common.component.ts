import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tiles-menu-common',
  templateUrl: './home-tiles-menu-common.component.html',
  styleUrls: ['./home-tiles-menu-common.component.scss']
})
export class HomeTilesMenuCommonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  gotoHome = function () {
    this.router.navigate(['/home']);
  };

  gotoSysAdmin = function () {
    this.router.navigate(['/root']);
  };

  gotoIct = function () {
    this.router.navigate(['/ict']);
  };

  gotoCommon = function () {
    // this.router.navigate(['/ict']);
    console.log('common');
  };

  gotoDutyRoster = function () {
    this.router.navigate(['/dutyroster']);
  };

  gotoGts = function () {
    this.router.navigate(['/nfc-guard-patrol']);
  };

  gotoFinance = function () {
    this.router.navigate(['/finance']);
  };

  gotoFbs = function () {
    this.router.navigate(['/fbs']);
  };

  gotoCss = function () {
    this.router.navigate(['/cs']);
  };

  gotoHr = function () {
    this.router.navigate(['/hr']);
  };

  gotoProfile = function () {
    this.router.navigate(['/my-profile']);
  };

  gotoRvm = function () {
    this.router.navigate(['/rvm']);
  };

  gotoOnlineApplication = function () {
    this.router.navigate(['/online-application']);
  };

  gotoEService = function () {
    this.router.navigate(['/e-service']);
  };

  gotoFacilityBooking = function () {
    this.router.navigate(['/facility-booking']);
  };

}
