import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';

// import { Observable, throwError, Subscriber } from 'rxjs';
// import { retry, catchError, tap, map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import {_throw} from 'rxjs/observable/throw';

import { AuthService } from '../../../core/services/auth/auth.service';
// import { Adal8HTTPService, Adal8Service, Adal8Interceptor } from 'adal-angular8';
import { Adal5HTTPService, Adal5Service, Adal5Interceptor } from 'adal-angular5';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiBaseService {

    adal8ServiceObj: any;

    constructor(private http: Adal5HTTPService, private authService: AuthService) {

    }

    private prepareOptions(): any {
        this.adal8ServiceObj = this.authService.getAdal8Service();
        let headers = new HttpHeaders();

        // console.log('ADAL Shit-Hole', this.adal8ServiceObj.userInfo.token);

        headers = headers
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
        return { headers };

        // const headersConfig = {
        //   'Content-Type': 'application/json',
        //   // tslint:disable-next-line:object-literal-key-quotes
        //   'Accept': 'application/json',
        //   // tslint:disable-next-line:object-literal-key-quotes
        //   'Authorization': `Bearer ${this.adal8ServiceObj.userInfo.token}`,
        // };

        // console.log('ADAL headersConfig', headersConfig);


        // return new HttpHeaders(headersConfig);
    }


    private prepareOptionsBlog(): any {
        this.adal8ServiceObj = this.authService.getAdal8Service();
        let headers = new HttpHeaders();

        headers = headers
            .set('Authorization', `Bearer ${this.adal8ServiceObj.userInfo.token}`);
        return { headers };
    }


    // ------------------------------------------------------------------------------

    // map(result => {
    //   if (!result) {
    //     return new LoadDataFailed('Could not fetch data!');
    //   } else {
    //     return new LoadDataSuccessful(result);
    //   }
    //  }),
    // catchError((err, caught) => {
    //   return empty();
    // })

    public getRequest(path: string): Observable<any> {
        const options = this.prepareOptions();
        return this.http.get(`${environment.api_url}${path}`, options)
            .pipe(catchError(this.formatErrors), map(res => res));
    }

    // tslint:disable-next-line:ban-types
    public putRequest(path: string, body: Object = {}): Observable<any> {
        const options = this.prepareOptions();
        return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), options)
            .pipe(catchError(this.formatErrors), map(res => res));
    }



    // tslint:disable-next-line:ban-types
    public postRequest(path: string, body: Object = {}): Observable<any> {
        const options = this.prepareOptions();
        console.log('API URL', environment.api_url + path);
        console.log('Header Option', options);

        return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), options)
            // .pipe(catchError(this.formatErrors), map(res => res));
            .pipe(map(res => res),catchError(this.handleError));
    }

    public deleteRequest(path: string): Observable<any> {
        const options = this.prepareOptions();
        return this.http.delete(`${environment.api_url}${path}`, options)
            .pipe(catchError(this.formatErrors), map(res => res));
    }


    // ------------------------------------------------------------------------------


    public get(path: string): Observable<any> {
        const options = this.prepareOptions();
        console.log('API URL', environment.api_url + path);
        console.log('Header Option', options);

        return this.http.get(`${environment.api_url}${path}`, options)
            .pipe(map(res => res), catchError(this.formatErrors));
    }

    // tslint:disable-next-line:ban-types
    public put(path: string, body: Object = {}): Observable<any> {
        const options = this.prepareOptions();
        console.log('API URL', environment.api_url + path);
        console.log('Header Option', options);

        return this.http.put(`${environment.api_url}${path}`, JSON.stringify(body), options)
            .pipe(map(res => res), catchError(this.formatErrors));
    }

    // tslint:disable-next-line:ban-types
    public xpost(path: string, body: Object = {}): Observable<any> {
        const options = this.prepareOptions();
        console.log('API URL', environment.api_url + path);
        console.log('Header Option', options);

        return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), options)
            .pipe(map(res => res), catchError(this.formatErrors));
    }

    public delete(path: string): Observable<any> {
        const options = this.prepareOptions();
        return this.http.delete(`${environment.api_url}${path}`, options)
            .pipe(map(res => res), catchError(this.formatErrors));
    }

    // -------------------------------------------------------------------------------

    // tslint:disable-next-line:ban-types
    public post(path: string, body: Object = {}): Observable<any> {
        const options = this.prepareOptions();
        console.log('API URL', environment.api_url + path);
        console.log('Header Option', options);

        return this.http.post(`${environment.api_url}${path}`, JSON.stringify(body), options)
            .pipe(map(res => res),
                catchError((error: HttpErrorResponse) => {
                    if (error.status) {
                        this.formatClientSideErrors(error);
                    } else {
                        this.formatServerSideErrors(error);
                        // return throwError(error);
                        return _throw(error);
                    }
                })
            );
    }








    // ------------------------------------------------------------------------------

    // private formatErrors(error: any) {
    //   return throwError(error.error);
    // }

    private formatErrors(error: any) {
        console.log('API Error Log', error);
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
            console.log('API Error Log = Client-Side', errorMessage);
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.log('API Error Log = Server-Side', errorMessage);
        }

        window.alert(errorMessage);
        // return throwError(errorMessage);
        return _throw(errorMessage);
    }




    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        // return throwError(errorMessage);
        return _throw(errorMessage);
    }




    formatClientSideErrors(error: any) {
        console.log('API Error Log => formatClientSideErrors', error);
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
            console.log('API Error Log = Client-Side', errorMessage);
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.log('API Error Log = Server-Side', errorMessage);
        }

        window.alert(errorMessage);
        // return throwError(errorMessage);
        return _throw(errorMessage);
    }

    formatServerSideErrors(error: any) {
        console.log('API Error Log => formatServerSideErrors', error);
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
            console.log('API Error Log = Client-Side', errorMessage);
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            console.log('API Error Log = Server-Side', errorMessage);
        }

        window.alert(errorMessage);
        // return throwError(errorMessage);
        return _throw(errorMessage);
    }





    error(error: Response | any) {
        var title = 'Error';
        var text = 'An error has occured';
        console.log('post Req error =>', error);

        if (error.status === 400) {
            title = error.error.Message;
            if (error.error.ModelState) {
                text = '';
                // tslint:disable-next-line:no-var-keyword
                for (var key in error.error.ModelState) {
                    if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
                        text += key.replace('model.', '') + ': ';
                        // tslint:disable-next-line:forin
                        for (var subkey in error.error.ModelState[key]) {
                            text += error.error.ModelState[key][subkey] + '<br />';
                        }
                    } else if (error.error.ModelState[key].length > 0) {
                        text += key.replace('model.', '') + ': ' + error.error.ModelState[key] + '<br />';
                    }
                }
            }
        } else if (error.status === 401) {
            title = 'Oh snap!';
            text = 'Authorization has been denied for this request. It seems that your request was Unauthorized (401)';

        } else if (error.status === 403) {
            title = 'Oh snap!';
            text = 'It seems that your request was Forbidden (403)';
        } else if (error.status === 404) {
            title = 'Oh snap!';
            text = 'It seems that your request was Not found (404)';
        } else if (error.status === 405) {
            title = 'Oh snap!';
            text = 'It seems that your request Method Not Allowed (405)';
        } else if (error.status === 406) {
            title = 'Oh snap!';
            text = 'It seems that your request Not Acceptable (406)';
        } else if (error.status === 412) {
            title = 'Oh snap!';
            text = 'It seems that your request Precondition Failed (412)';
        } else if (error.status === 415) {
            title = 'Oh snap!';
            text = 'It seems that your request was Unsupported Media Type (415)';
        } else if (error.status === 0 || error.status >= 500) {
            title = 'Oh snap!';
            text = 'Cannot Connect to the Server. Internal Server Error (500)';
        }
    }

}
