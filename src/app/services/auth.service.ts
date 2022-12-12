import { Injectable, NgZone } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { ActivatedRoute, Router } from '@angular/router';
import * as lib from 'adal-angular5';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/observable/bindCallback';
import 'rxjs/observable/timer';
import { delay } from 'rxjs/operators';

// import 'rxjs/add/observable/concat';
// import 'rxjs/add/observable/defer';
// import 'rxjs/add/observable/empty';
// import 'rxjs/add/observable/from';
// import 'rxjs/add/observable/fromEvent';
// import 'rxjs/add/observable/merge';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/observable/timer';
// import 'rxjs/add/operator/concatMap';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/expand';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/first';
// import 'rxjs/add/operator/let';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/mergeMap';
// import 'rxjs/add/operator/publishReplay';
// import 'rxjs/add/operator/reduce';
// import 'rxjs/add/operator/share';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/take';
// import 'rxjs/add/operator/takeWhile';


@Injectable()
export class AuthService {

    // private context: adal.AuthenticationContext = <any>null;
    private loginRefreshTimer = <any>null;

    constructor(
        private adal5Service: Adal5Service,
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone
    ) {

        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        if (this.adal5Service.userInfo.authenticated) {
            this.router.navigate([returnUrl]);
        } else {
            this.adal5Service.login();
        }
    }







    public getCachedToken() {

    }

    public acquireToken() {

    }

    public getUser() {

    }

    public clearCache(): void {
    }

    private refreshLoginToken(): void {
    }

    private now(): number {
        return Math.round(new Date().getTime() / 1000.0);
    }


    private setupLoginTokenRefreshTimer(): void {
        // // Get expiration of login token
        // let exp = this.context._getItem(this.context.CONSTANTS.STORAGE.EXPIRATION_KEY + <any>this.context.config.loginResource);
        // console.log('setupLoginTokenRefreshTimer', exp);

        // // Either wait until the refresh window is valid or refresh in 1 second (measured in seconds)
        // // tslint:disable-next-line:max-line-length
        // let timerDelay = exp - this.now() - (this.context.config.expireOffsetSeconds || 300) > 0 ? exp - this.now() - (this.context.config.expireOffsetSeconds || 300) : 1;
        // console.log('setupLoginTokenRefreshTimer', timerDelay);

        // this.ngZone.runOutsideAngular(() => {
        //     // this.loginRefreshTimer = timer(timerDelay * 1000).subscribe((x) => {
        //     this.loginRefreshTimer = delay(timerDelay * 1000).subscribe((x) => {
        //         this.refreshLoginToken();              // call Login Refresh Function
        //     });
        // });
    }

    public logout() {
        this.adal5Service.logOut();
    }





    set(key: string, data: any): void {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error('Error saving to localStorage', e);
        }
    }

    get(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error('Error getting data from localStorage', e);
            return null;
        }
    }



}
