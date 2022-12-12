import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-tiles-common-menu',
  templateUrl: './app-tiles-common-menu.component.html',
  styleUrls: ['./app-tiles-common-menu.component.scss']
})
export class AppTilesCommonMenuComponent implements OnInit {

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
    this.router.navigate(['/gts']);
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

  gotoRvm = function () {
    this.router.navigate(['/rvm']);
  };

  gotoIntranet(): void {
    // this.router.ngOnDestroy();
    // window.location.href = 'http://www.cnn.com/';
    window.open('http://mynet.mwsc.net', '_blank');
  }

  gotoSis(): void {
    window.open('http://sis.mwsc.com.mv', '_blank');
  }

  gotoHelpdesk(): void {
    window.open('https://helpdesk.mwsc.com.mv', '_blank');
  }

  gotoAppraisal(): void {
    window.open('http://appraisal.mwsc.com.mv', '_blank');
  }

}
