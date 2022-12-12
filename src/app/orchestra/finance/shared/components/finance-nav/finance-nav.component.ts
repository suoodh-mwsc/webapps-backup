import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-finance-nav',
  templateUrl: './finance-nav.component.html',
  styleUrls: ['./finance-nav.component.scss']
})
export class FinanceNavComponent implements OnInit {

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
