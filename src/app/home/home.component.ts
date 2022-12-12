import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private adal5Service: Adal5Service) { }

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

  logout() {
    this.adal5Service.logOut();
  }

}
