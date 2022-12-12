import { Component, OnInit } from '@angular/core';
import {
  BrowserModule,
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';
import { EServiceBaseService } from './../../../e-service/shared/services/e-service-base.service';
import { ModalDirective } from 'ngx-bootstrap';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-e-service-account-notification',
  templateUrl: './e-service-account-notification.component.html',
  styleUrls: ['./e-service-account-notification.component.scss']
})
export class EServiceAccountNotificationComponent implements OnInit {

  eServiceUserShowLoader: boolean;
  showLoader: boolean;

  eServiceUsers: any = [];
  userDetails: any = [];

  searchText: any;

  constructor(
    private domSanitizer: DomSanitizer,
    private eServiceBase: EServiceBaseService) {
    this.eServiceUserShowLoader = false;
    this.eServiceUsers = [];
    this.userDetails = [];
  }

  ngOnInit() { }

  searchPortalUser(searchText) {
    this.eServiceUserShowLoader = true;
    this.eServiceUsers = [];
    this.userDetails = [];
    console.log('postePortalUserSearch', searchText);
    this.eServiceBase
      .postePortalUserSearch({
        SearchValue: searchText
      }).subscribe(
        (data: any) => {
          this.eServiceUsers = data;
          console.log('searchPortalUser', this.eServiceUsers);
          this.eServiceUserShowLoader = false;
        },
        (error: Response | any) => {
          this.eServiceUserShowLoader = false;
          return Observable.throw(new Error(error.status));
        });
  }
}
