import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adal5Service } from 'adal-angular5';


@Component({
  selector: 'app-nfc-guard-patrol-navbar',
  templateUrl: './nfc-guard-patrol-navbar.component.html',
  styleUrls: ['./nfc-guard-patrol-navbar.component.scss']
})
export class NfcGuardPatrolNavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private adal5Service: Adal5Service) { }

  ngOnInit() {
  }

  logout() {
    this.adal5Service.logOut();
  }

}
