import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-online-application-navbar',
  templateUrl: './online-application-navbar.component.html',
  styleUrls: ['./online-application-navbar.component.scss']
})
export class OnlineApplicationNavbarComponent implements OnInit {

  constructor(
    private router: Router, 
    private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  logout() {
    this.adal5Service.logOut();
  }

}
