import { Component, OnInit, Input } from '@angular/core';
import { environment } from './../environments/environment';
// import { logWarnings } from 'protractor/built/driverProviders';
// import { log } from 'util';
import { AuthService } from './core/services/auth/auth.service';
import { UiBaseService } from './core/services/ui-setup/ui-base.service';
import { Adal5HTTPService, Adal5Service, Adal5Interceptor } from 'adal-angular5';
//
import { GlobalService } from './services/global.service';
import { YodaService } from './services/yoda.service';
import { DomSanitizer } from '@angular/platform-browser';
// import { Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';


const config = {
  tenant: environment.adalConfig.tenant,
  clientId: environment.adalConfig.clientId,
  popUp: environment.adalConfig.popUp,
  postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
  navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MWSC';

  // Environment Config
  public applicationEnvironment: string;
  public apiEnvironment: string;

  // Token
  public accessToken: any;
  public isAuthenticated: boolean;
  public loggedInUserFullname: string;

  // Store User Info
  public myProfile: any;
  public myProfilePictureBase64: any;

  @Input() sideBarLinks: any;

  constructor(
    private uiBaseService: UiBaseService,
    private authService: AuthService,
    public adalService: Adal5Service, public yoda: YodaService,
    public global: GlobalService, public sanitizer: DomSanitizer) {
    console.log('(AppComp) Env Prod:', environment.production); // Logs false for default environment

    this.applicationEnvironment = environment.yodaServer;
    this.apiEnvironment = environment.yodaBase;
    console.log('applicationEnvironmentServer', this.applicationEnvironment);
    console.log('applicationEnvironmentServer', this.apiEnvironment);

    // this.isAuthenticated = false;
    // this.adalService.init(environment.adalConfig);
    // this.loggedInUserFullname = '';
    // this.adalService.handleWindowCallback();
    // this.login();
  }

  ngOnInit() {
    this.adalService.init(config);

    // this.adalInit().then(data => this.adalConfig = data);

    this.adalInit().then(data => {
      return new Promise(resolve => {
        const adalConfig = this.uiBaseService.getAppConfigData();
        resolve(adalConfig);
        console.log('My Peers', adalConfig);
      });
    });
  }


  // passwordreset(email): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     firebase.auth().sendPasswordResetEmail(email).then(() => {
  //       resolve({ success: true });
  //     })
  //       .catch((err) => {
  //         reject(err);
  //       });
  //   });
  // }



  adalInit() {
    return new Promise((resolve, reject) => {
      const adalConfig = this.authService.loginUser();
      console.log('My Peers', adalConfig);
      resolve(adalConfig);
    });
  }


  public logout() {
    localStorage.clear();
    this.adalService.init(environment.adalConfig);
    console.log('Logging Out');
    this.adalService.logOut();
  }


  // getMyProfile() {
  //   return new Promise(resolve => {
  //     this.global.getMyDetails()
  //       .subscribe(data => {
  //         this.myProfile = data;
  //         localStorage.setItem('localStorageMyProfile', JSON.stringify(data))
  //         // console.log ('Profile', this.myProfile.Id);
  //         this.global.getUserPictureBase64(this.myProfile.Id)
  //           .subscribe((base64: string) => {
  //             this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
  //             localStorage.setItem('myProfilePictureBase64', base64);
  //           });
  //         resolve(this.myProfile);
  //         console.log(this.myProfile);
  //       });
  //   });
  // }


}
