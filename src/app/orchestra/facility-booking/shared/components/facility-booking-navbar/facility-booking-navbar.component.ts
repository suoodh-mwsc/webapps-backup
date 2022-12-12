import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';


@Component({
  selector: 'app-facility-booking-navbar',
  templateUrl: './facility-booking-navbar.component.html',
  styleUrls: ['./facility-booking-navbar.component.scss']
})
export class FacilityBookingNavbarComponent implements OnInit {

  constructor(private router: Router, private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  logout() {
    this.adal5Service.logOut();
  }

}
