import { Injectable } from '@angular/core';
// Enviroment
import { environment } from './../../../../environments/environment';
// Services
import { GlobalBaseService } from '../ui-setup/global-base.service';
// Puglins
// import { Observable, of } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
// import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { Adal5HTTPService, Adal5Service, Adal5Interceptor } from 'adal-angular5';
import { DomSanitizer } from '@angular/platform-browser';

import { UiBaseService } from './../ui-setup/ui-base.service';



const config = {
    tenant: environment.adalConfig.tenant,
    clientId: environment.adalConfig.clientId,
    popUp: environment.adalConfig.popUp,
    // redirectUri: window.location.href.substring(0, window.location.href.lastIndexOf("/")+1), //window.location.origin + '/',
    postLogoutRedirectUri: environment.adalConfig.postLogoutRedirectUri,
    navigateToLoginRequestUrl: environment.adalConfig.navigateToLoginRequestUrl
};

@Injectable()
export class AuthService {

    public firstBreed: any;
    // public dogsData$: Observable<any>;

    public myAdal8ServicePayload: any;    // Token - adalPayload
    public adalToken: any;                // Token - adalToken
    public myProfile: any;                // Store User Profile Info
    public myProfilePictureBase64: any;   // Store User Image

    constructor(
        public adalService: Adal5Service, private http: Adal5HTTPService,
        // private uiBaseService: UiBaseService,
        // private global: GlobalService,private sanitizer: DomSanitizer
    ) {
        console.log('Env Prod:', environment.production); // Logs false for default environment
        this.adalInit();
    }

    public adalInit() {
        this.adalService.init(config);
        this.loginUser();
    }

    public loginUser() {
        // Handle callback if this is a redirect from Azure
        this.adalService.handleWindowCallback();
        // Check if the user is authenticated. If not, call the login() method


        return new Promise((resolve, reject) => {
            if (!this.adalService.userInfo.authenticated) {
                this.adalService.login();
                this.setAdal8Service(this.adalService);
                resolve(this.adalService);
                // console.log('username ', this.adalService.userInfo.username);
                // console.log('authenticated: ', this.adalService.userInfo.authenticated);
                // console.log('token: ', this.adalService.userInfo.token);
                // console.log('Expiry: ', this.adalService.userInfo.profile.exp);

                // var myTime = this.convertTimestamptoTime(this.adalService.userInfo.profile.exp);
                // console.log('Expiry Converted: ', myTime);
                // var nowTime = this.getNowDateTimeStr();
                // console.log('Expiry Now: ', nowTime);

                // console.log('adal: ', this.adalService);
            } else {
                this.setAdal8Service(this.adalService);
                resolve(this.adalService);
                // Log the user information to the console
                // console.log('username ', this.adalService.userInfo.username);
                // console.log('authenticated: ', this.adalService.userInfo.authenticated);
                // console.log('token: ', this.adalService.userInfo.token);
                // console.log('Expiry: ', this.adalService.userInfo.profile.exp);

                // var myTime = this.convertTimestamptoTime(this.adalService.userInfo.profile.exp);
                // console.log('Expiry Converted: ', myTime);
                // var nowTime = this.getNowDateTimeStr();
                // console.log('Expiry Now: ', nowTime);

                // console.log('adal: ', this.adalService);
                this.getMyProfile();
            }
        });
    }


    // public getDummyData() {
    //     // this.dogsData$ = this.http.get('https://dog.ceo/api/breeds/list', { observe: 'response' })
    //     //   .map(response => response.body);

    //     // const sub = this.dogsData$.subscribe(data => {
    //     //   this.firstBreed = data.message[0];
    //     // });

    //     this.dogsData$ = this.http.get('https://dog.ceo/api/breeds/list', { observe: 'response' }).pipe(map(response => response.body));
    //     const sub = this.dogsData$.subscribe(result => {
    //         console.log('getDummyData: ', result);
    //         this.firstBreed = result.message[0];
    //     });
    // }


    // Logout Method
    public logout() {
        localStorage.clear();
        this.adalService.init(environment.adalConfig);
        console.log('Logging Out');
        this.adalService.logOut();
    }


    convertTimestamptoTime(unixTimestampMy) {
        var unixtimestamp = unixTimestampMy;        // Unixtimestamp
        // Months array
        var months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var date = new Date(unixtimestamp * 1000);  // Convert timestamp to milliseconds
        var year = date.getFullYear();              // Year
        var month = months_arr[date.getMonth()];    // Month
        var day = date.getDate();                   // Day
        var hours = date.getHours();                // Hours
        var minutes = '0' + date.getMinutes();      // Minutes
        var seconds = '0' + date.getSeconds();      // Seconds

        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return convdataTime;
    }

    getNowDateTimeStr() {
        var now = new Date();
        var hour = now.getHours() - (now.getHours() >= 12 ? 12 : 0);

        var convertedDateTime = [
            [this.AddZero(now.getDate()), this.AddZero(now.getMonth() + 1), now.getFullYear()].join('/'),
            [this.AddZero(hour), this.AddZero(now.getMinutes())].join(':'), now.getHours() >= 12 ? 'PM' : 'AM'].join(' ');

        return convertedDateTime;
    }

    AddZero(num) {
        return (num >= 0 && num < 10) ? '0' + num : num + '';
    }

    public setAdal8Service(adalPayload: any) {
        this.myAdal8ServicePayload = adalPayload;
        this.setlocalStorageToken(this.myAdal8ServicePayload);    // localStorage
    }

    public getAdal8Service() {
        if (!this.myAdal8ServicePayload.userInfo.authenticated) {
            this.getlocalStorageToken();                            // localStorage
        }
        return this.myAdal8ServicePayload;
    }


    public renewToken() {
        console.log('handleWindowCallback', this.adalService.refreshDataFromCache());
        this.adalService.refreshDataFromCache();
        var token = this.adalService.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
            console.log('renewToken :::>> Token', token);
            // this.setToken(token);
        });
    }


    public getlocalStorageToken() {
        return new Promise(resolve => {
            this.adalToken = localStorage.getItem('adalToken');
            if (this.adalToken) {
                console.log('getToken :::>> Token Resolved');
                resolve(this.adalToken);
            } else {
                console.log('getToken :::>> No token');
            }
        });
    }


    public setlocalStorageToken(adalToken) {
        return new Promise(resolve => {
            this.adalToken = localStorage.setItem('adalToken', (adalToken));
            if (this.adalToken) {
                console.log('setToken :::>> Token Resolved');
                resolve(this.adalToken);
            } else {
                console.log('setToken :::>> No token');
            }
        });
    }


    public getMyProfile() {
        // return new Promise(resolve => {
        //   this.global.getMyDetails().subscribe(data => {
        //     this.myProfile = data;
        //     localStorage.setItem('localStorageMyProfile', JSON.stringify(data));
        //     // console.log ('Profile', this.myProfile.Id);
        //     this.global.getUserPictureBase64(this.myProfile.Id).subscribe((base64: string) => {
        //       this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
        //       localStorage.setItem('myProfilePictureBase64', base64);
        //     });
        //     resolve(this.myProfile);
        //     console.log(this.myProfile);
        //   });
        // });
    }

}
