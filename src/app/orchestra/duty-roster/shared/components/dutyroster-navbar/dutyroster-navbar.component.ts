import { Component, OnInit } from '@angular/core';
import { Adal5Service } from 'adal-angular5';

@Component({
  selector: 'app-dutyroster-navbar',
  templateUrl: './dutyroster-navbar.component.html',
  styleUrls: ['./dutyroster-navbar.component.scss']
})
export class DutyrosterNavbarComponent implements OnInit {

  constructor(private adal5Service: Adal5Service) { }

  ngOnInit() {
  }


  logout() {
    this.adal5Service.logOut();
  }
}
