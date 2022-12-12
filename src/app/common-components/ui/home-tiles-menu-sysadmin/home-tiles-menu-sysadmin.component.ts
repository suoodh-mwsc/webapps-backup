import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-tiles-menu-sysadmin',
  templateUrl: './home-tiles-menu-sysadmin.component.html',
  styleUrls: ['./home-tiles-menu-sysadmin.component.scss']
})
export class HomeTilesMenuSysadminComponent implements OnInit {

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

}
