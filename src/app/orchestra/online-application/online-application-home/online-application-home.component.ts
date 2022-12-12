import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-application-home',
  templateUrl: './online-application-home.component.html',
  styleUrls: ['./online-application-home.component.scss']
})
export class OnlineApplicationHomeComponent implements OnInit {

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
