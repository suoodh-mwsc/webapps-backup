import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-online-payment-navbar',
  templateUrl: './online-payment-navbar.component.html',
  styleUrls: ['./online-payment-navbar.component.scss']
})
export class OnlinePaymentNavbarComponent implements OnInit {

  constructor(private router: Router, private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  gotoFinance = function () {
    this.router.navigate(['/finance']);
  };

  gotoExternalPayment = function () {
    this.router.navigate(['/external-payment']);
  };

  gotoOnlinePayment = function () {
    this.router.navigate(['/online-payment']);
  };

  logout() {
    this.adal5Service.logOut();
  }

}
