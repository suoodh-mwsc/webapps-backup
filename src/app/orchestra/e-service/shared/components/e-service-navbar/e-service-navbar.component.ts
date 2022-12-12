import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-e-service-navbar',
  templateUrl: './e-service-navbar.component.html',
  styleUrls: ['./e-service-navbar.component.scss']
})
export class EServiceNavbarComponent implements OnInit {

  constructor(
    private router: Router, 
    private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  logout() {
    this.adal5Service.logOut();
  }

}
