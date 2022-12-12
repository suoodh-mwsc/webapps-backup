import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';


@Component({
  selector: 'app-finance-dashboard',
  templateUrl: './finance-dashboard.component.html',
  styleUrls: ['./finance-dashboard.component.scss']
})
export class FinanceDashboardComponent implements OnInit {

  constructor(private router: Router, private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  gotoFinance = function () {
    this.router.navigate(['/finance']);
  };

  gotoExternalPayment = function () {
    this.router.navigate(['/externalpayment']);
  };

  gotoOnlinePayment = function () {
    this.router.navigate(['/onlinepayment']);
  };

  logout() {
    this.adal5Service.logOut();
  }

}
