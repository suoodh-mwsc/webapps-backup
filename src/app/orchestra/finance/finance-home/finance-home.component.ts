import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance-home',
  templateUrl: './finance-home.component.html',
  styleUrls: ['./finance-home.component.scss']
})
export class FinanceHomeComponent implements OnInit {

  showSideMenu: boolean;

  constructor() {
    this.showSideMenu = true;
  }

  ngOnInit() {
  }

  menuToggle() {
    if (this.showSideMenu = true) {
      this.showSideMenu = false;
    } else {
      this.showSideMenu = true;
    }
  }

}
