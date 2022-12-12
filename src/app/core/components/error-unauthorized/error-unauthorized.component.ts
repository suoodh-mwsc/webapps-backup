import { Component, OnInit } from '@angular/core';
import { environment } from './../../../../environments/environment';
// import { GlobalService } from './../../../../../services/global.service';
// import { YodaService } from './../../../../../services/yoda.service';
import { DomSanitizer } from '@angular/platform-browser';

import { UiBaseService } from './../../services/ui-setup/ui-base.service';

import { AuthService } from './../../services/auth/auth.service';
import { Adal5HTTPService, Adal5Service, Adal5Interceptor } from 'adal-angular5';


const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-error-unauthorized',
  templateUrl: './error-unauthorized.component.html',
  styleUrls: ['./error-unauthorized.component.scss']
})
export class ErrorUnauthorizedComponent implements OnInit {

  today: number = Date.now();

  public loggedInUserFullname: string;
  public myProfile: any;
  public myProfilePictureBase64: any;


  constructor(
    private uiBaseService: UiBaseService,
    public adalServ: Adal5Service,
    // public yoda: YodaService,
    // public global: GlobalService,
    private authService: AuthService,
    public adalService: Adal5Service,
    public sanitizer: DomSanitizer) {

    if (this.adalServ.userInfo.authenticated) {
      this.loggedInUserFullname = this.adalServ.userInfo.profile.name;
      this.getMyProfile();
    } else {
      this.loggedInUserFullname = 'Invalid User';
    }
  }

  ngOnInit() {
    // this.adalService.init(config);
  }

  adalInit() {
    return new Promise((resolve, reject) => {
      const adalConfig = this.authService.loginUser();
      console.log('My Peers', adalConfig);
      resolve(adalConfig);
    });
  }


  public getMyProfile() {
    this.myProfile = JSON.parse(localStorage.getItem('localStorageMyProfile'));
    this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('myProfilePictureBase64'));
  }


  public logout() {
    console.log('Logging Out');
    this.adalServ.logOut();
  }

  renewToken() {
    this.adalInit().then(data => {
      return new Promise(resolve => {
        const adalConfig = this.uiBaseService.getAppConfigData();
        resolve(adalConfig);
        console.log('My Peers', adalConfig);
      });
    });
  }

}
