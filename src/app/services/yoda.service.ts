import { Injectable } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { errorHandler } from '@angular/platform-browser/src/browser';

import 'rxjs/add/operator/catch'; // don't forget this, or you'll get a runtime error
import { error } from 'util';

import { Router } from '@angular/router';

declare var Swal: any;


@Injectable()
export class YodaService {
  /* tslint:disable */
  errors: any = [];
  private authHeaders: HttpHeaders;
  private tokenResource: string;
  private apiAddress: any;

  constructor(
    private adal5Service: Adal5Service,
    private http: HttpClient,
    private router: Router) {
    this.apiAddress = environment.yodaBase;
  }

  private headerWithToken(): HttpHeaders {
    if (this.adal5Service.userInfo.authenticated) {
      if (this.adal5Service.userInfo.token) {
        const headersConfig = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.adal5Service.userInfo.token,
        };
        // console.log('headersConfig.', 'valid Token');
        return new HttpHeaders(headersConfig);
      }
    } else {
      console.log('TokenHeader :::: ', 'Invalid Token');
      console.log(this.adal5Service.userInfo.username, '. TokenHeader :::: You are not logged in. Please log in and try again.');
      let title = 'Login Error - You are not logged in';
      let text = 'You are not logged in. Please log in and try again.';
      this.showYodaErrorMsg(title, text);
      Swal({
        title: title,
        text: text,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      }).then(function () {
        console.log('TokenHeader ::::', 'Navigate to Login');
        this.router.navigate(['/login']);
        // this.adal5Service.logOut();
        // this.adal5Service.init(environment.adalConfig);
        // this.adal5Service.login();

        var token = this.adal5Service.acquireToken('https://graph.microsoft.com').subscribe((token: string) => {
          console.log('login :::>> Token', token);
        });

      });
    }
  }



  private headerWithTokenForImages(): HttpHeaders {
    if (this.adal5Service.userInfo.authenticated) {
      if (this.adal5Service.userInfo.token) {
        const headersConfig = {
          'Authorization': 'Bearer ' + this.adal5Service.userInfo.token,
        };
        return new HttpHeaders(headersConfig);
      }
    } else {
      console.log('TokenHeader :::: ', 'Invalid Token');
      console.log(this.adal5Service.userInfo.username, '. TokenHeader :::: You are not logged in. Please log in and try again.');
      let title = 'Login Error - You are not logged in';
      let text = 'You are not logged in. Please log in and try again.';
      this.showYodaErrorMsg(title, text);
      Swal({
        title: title,
        text: text,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        timer: 2000,
      }).then(function () {
        console.log('TokenHeader ::::', 'Navigate to Login');
        this.router.navigate(['/login']);
        // this.adal5Service.logOut();
        // this.adal5Service.init(environment.adalConfig);
        // this.adal5Service.login();
      });
    }
  }


  private handleError(error: Response | any) {
    // console.error('ApiService::handleError', error);
    // return Observable.throw(error);

    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    var err = '';
    if (error instanceof Response) {
      // Normally errors come in as response objects
      const body = error.json() || '';
      err = body.message || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''}: ${err}`;
      console.error(errMsg);
      // Check for timeout errors.  The 0 status is what appears since the Access-Control-Allow-Origin headers are not set by Heroku when it times out.  
      if ((error.status == 503) || (error.status == 0)) {
        err = 'The server timed out trying to calculate your response.  Try reloading, and if that doesn\'t work try DifferentialEquations.jl!';
      }
      // this.showAPIhandleErrorMsg(error.status, errMsg, error.ModelState)
      return Observable.throw(err);
    } else {
      // A generic error fallback
      errMsg = error.message ? error.message : error.toString();
      console.error(errMsg);
      return Observable.throw(errMsg);
    }
  }


  public showError(error: Response | any) {
    var title = 'Error';
    var text = 'An error has occured';
    console.log(error);

    if (error.status === 400) {
      title = error.error.Message;
      if (error.error.ModelState) {
        text = '';
        for (var key in error.error.ModelState) {
          if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
            text += key.replace('model.', '') + ': ';
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
      this.router.navigate(['/login']);
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
    var options = {
      title: title,
      html: text,
      type: 'error',
      showCancelButton: false,
      allowOutsideClick: false
    };
    Swal(options);
  }


  get(path: string, httpParams: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.yodaBase}${path}`, { headers: this.headerWithToken(), params: httpParams })
      // .catch(this.handleError)
      // .catch((error: any) => {
      //   this.showError(error);
      //   return Observable.throw(new Error(error.status));
      // })
      .catch((error: Response | any) => {
        var title = 'Error';
        var text = 'An error has occured';
        console.log('post Req error =>', error);

        if (error.status === 400) {
          title = error.error.Message;
          if (error.error.ModelState) {
            text = '';
            for (var key in error.error.ModelState) {
              if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
                text += key.replace('model.', '') + ': ';
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
          this.router.navigate(['/login']);
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
        var options = {
          title: title,
          html: text,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        };
        Swal(options);
        // return Observable.of(error);
        return Observable.throw(new Error(error.status));
      })
      .map(res => res);
  }


  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(`${environment.yodaBase}${path}`, JSON.stringify(body), { headers: this.headerWithToken() })
      .catch((error) => {
        // this.formatErrors(error);
        return Observable.of(error);
      })
      .map(res => res);
  }


  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${environment.yodaBase}${path}`, body, { headers: this.headerWithToken() })
      // .catch(this.handleError)
      .catch((error: Response | any) => {
        // this.showError(error);
        var title = 'Error';
        var text = 'An error has occured';
        console.log('post Req error =>', error);

        if (error.status === 400) {
          title = error.error.Message;
          if (error.error.ModelState) {
            text = '';
            for (var key in error.error.ModelState) {
              if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
                text += key.replace('model.', '') + ': ';
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
          this.router.navigate(['/login']);
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
        var options = {
          title: title,
          html: text,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        };
        Swal(options);
        // return Observable.of(error);
        return Observable.throw(new Error(error.status));
      })
      .map(res => res);
  }


  postFile(path: string, FormData: File): Observable<any> {
    return this.http.post(`${environment.yodaBase}${path}`, FormData, { headers: this.headerWithTokenForImages() })
      .catch((error: Response | any) => {
        // this.showError(error);
        var title = 'Error';
        var text = 'An error has occured';
        console.log('post Req error =>', error);
        if (error.status === 400) {
          title = error.error.Message;
          if (error.error.ModelState) {
            text = '';
            for (var key in error.error.ModelState) {
              if (Array.isArray(error.error.ModelState[key]) && error.error.ModelState[key].length > 0) {
                text += key.replace('model.', '') + ': ';
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
          this.router.navigate(['/login']);
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
        var options = {
          title: title,
          html: text,
          type: 'error',
          showCancelButton: false,
          allowOutsideClick: false
        };
        Swal(options);
        // return Observable.of(error);
        return Observable.throw(new Error(error.status));
      })
      .map(res => res);
  }

  delete(path): Observable<any> {
    return this.http.delete(`${environment.yodaBase}${path}`, { headers: this.headerWithToken() })
      // .catch(this.formatErrors)
      .catch((error) => {
        // this.formatErrors(error);
        this.showError(error);
        return Observable.of(error);
      })
      .map(res => res);
  }



  showSuccess(title, text) {
    Swal({
      title: title,
      text: text
    });
  }


  showYodaMsgBox(title, text, time) {
    Swal({
      title: title,
      text: text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: time,
    });
  }


  showErrorMsg(title, text) {
    Swal.fire({
      type: 'error',
      title: title,
      text: text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
  }


  showYodaErrorMsg(title, text) {
    Swal({
      title: title,
      text: text,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 2000,
    });
  }


  showAPIErrorMsg(titlex, textx) {
    Swal({
      type: 'error',
      title: titlex,
      text: textx,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 3000,
    });
  }


  showAPIhandleErrorMsg(errorCode, errorMessage, errorModelState) {
    Swal({
      type: 'error',
      title: errorCode,
      text: errorMessage + "," + errorModelState,
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 3000,
    });
  }


  showNewMsgBox(title, text, time) {
    Swal({
      title: title,
      text: text,
      type: 'success',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: time,
    });
  }

  showErrorMsgBox(title, text, time) {
    Swal({
      title: title,
      text: text,
      type: 'error',
      showCancelButton: false,
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: time,
    });
  }

}
