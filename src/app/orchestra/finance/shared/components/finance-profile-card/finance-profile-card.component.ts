import { Component, OnInit } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { GlobalService } from '../../../../../services/global.service';
import { YodaService } from '../../../../../services/yoda.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-finance-profile-card',
  templateUrl: './finance-profile-card.component.html',
  styleUrls: ['./finance-profile-card.component.scss']
})
export class FinanceProfileCardComponent implements OnInit {

  today: number = Date.now();

  public loggedInUserFullname: string;
  public myProfile: any;
  public myProfilePictureBase64: any;


  constructor(
    public _adal5Serv: Adal5Service,
    public yoda: YodaService,
    public global: GlobalService,
    public sanitizer: DomSanitizer) {

    if (this._adal5Serv.userInfo.authenticated) {
      this.loggedInUserFullname = this._adal5Serv.userInfo.profile.name;
      // this.loggedInUserFullname = this._adal5Serv.userInfo.profile.unique_name;
      // console.log('Login in service.userInfo :', this._adal5Serv.userInfo);
      // console.log('Login Exp :', this._adal5Serv.userInfo.profile.exp = new Date().toLocaleString());
      // console.log('Login DU :', this._adal5Serv.userInfo.profile.unique_name);
      // console.log('Login By :', this._adal5Serv.userInfo.profile.name);
      this.getMyProfile();
    } else {
      this.loggedInUserFullname = 'Invalid User';
    }
  }

  ngOnInit() {
  }


  getMyProfile() {
    this.myProfile = JSON.parse(localStorage.getItem('localStorageMyProfile'));
    this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + localStorage.getItem('myProfilePictureBase64'));

    // return new Promise(resolve => {
    //   this.global.getMyDetails()
    //     .subscribe(data => {
    //       this.myProfile = data;
    //       // console.log ('Profile', this.myProfile.Id);
    //       this.global.getUserPictureBase64(this.myProfile.Id)
    //         .subscribe((base64: string) => {
    //           this.myProfilePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
    //         });
    //       // console.log(data);
    //       resolve(this.myProfile);
    //       console.log(this.myProfile);
    //     });
    // });
  }


  public logout() {
    console.log('Logging Out');
    this._adal5Serv.logOut();
  }

}
