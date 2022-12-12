import { Injectable } from '@angular/core';
import { GlobalBaseService } from './global-base.service';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Injectable()
// @Injectable({
//     providedIn: 'root'  // <- ADD THIS
// })
export class UiBaseService {

    public appConfig: any = [];

    tempProfile: any = [];
    tempProfilePicture: any = [];

    public myProfile: any = [];
    public myProfilePicture: any = [];
    public displayProfileName: any = [];
    public displayProfilePicture: any = [];

    public myPeers: any = [];
    public mySubordinates: any = [];

    constructor(private globalBase: GlobalBaseService, public sanitizer: DomSanitizer, private http: HttpClient) {
        this.appConfig = [
            {
                appEnviroment: [], appAccessList: [], uiConfig: [], myProfileInfo: [{ myProfile: {}, myProfilePicture: {}, displayName: {}, displayPicture: {}, myPeers: [], mySubordinates: [] }]
            },
        ];

        if (this.appConfig) {
            this.appConfig.forEach(ele => {
                if (ele) {
                    ele.appAccessList = [
                        { appName: 'Root', accessType: 'Admin', activeInLive: false, activeInDemo: true, activeInDev: true },
                        { appName: 'Admin Console', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'e-service', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'finance', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'lms', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'nfc', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'online-application', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                        { appName: 'staff-portal', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
                    ];
                }
            });
        }

        // this.appConfig.appAccessList = [
        //   { appName: 'Root', accessType: 'Admin', activeInLive: false, activeInDemo: true, activeInDev: true },
        //   { appName: 'Admin Console', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'e-service', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'finance', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'lms', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'nfc', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'hr', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'online-application', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        //   { appName: 'staff-portal', accessType: 'Admin', activeInLive: true, activeInDemo: true, activeInDev: true },
        // ];
    }


    public getAppConfigData() {
        this.getMyProfile();


        this.getMyProfile().then(data => {
            return new Promise(resolve => {
                const dataPromise = this.getMyPeers();
                const adalConfig = this.getMySubordinates();
                resolve(dataPromise);
                console.log('My Peers', dataPromise);
            });
        });

        console.log('getAppConfigData', this.appConfig);
        return this.appConfig;
    }


    // public getMyProfile() {
    //     return new Promise(resolve => {
    //         this.globalBase.getMyProfileDetails().subscribe(data => {
    //             console.log('getMyProfile', data);
    //             this.tempProfile = [];
    //             this.tempProfilePicture = [];

    //             this.tempProfile = data;
    //             this.globalBase.getMyProfilePictureBase64(data.Id).subscribe((base64: string) => {
    //                 this.tempProfilePicture = base64;
    //                 if (this.tempProfile) {
    //                     this.myProfile = this.tempProfile;
    //                     localStorage.setItem('myProfile', JSON.stringify(this.tempProfile));
    //                 }
    //                 if (this.tempProfilePicture) {
    //                     this.myProfilePicture = this.tempProfilePicture;
    //                     localStorage.setItem('myProfilePicture', this.tempProfilePicture);
    //                 }
    //                 if (data.Id === '1222') {
    //                     this.http.get('/assets/img/theme/profile-suoodh.jpg', { responseType: 'blob' }).subscribe(res => {
    //                         // tslint:disable-next-line:no-shadowed-variable
    //                         const reader = new FileReader();
    //                         reader.readAsDataURL(res);
    //                         // console.log('Local Asset readAsDataURL', res);
    //                         reader.onload = () => {
    //                             let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
    //                             if ((encoded.length % 4) > 0) {
    //                                 encoded += '='.repeat(4 - (encoded.length % 4));
    //                             }
    //                             // console.log('Local Asset encoded', encoded);
    //                             // this.displayProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + encoded);
    //                             this.displayProfilePicture = encoded;
    //                         };
    //                     });
    //                     if (this.displayProfileName) {
    //                         // this.displayProfileName = data.Name;
    //                         this.displayProfileName = 'Suoodh';
    //                         localStorage.setItem('displayName', JSON.stringify(this.displayProfileName));
    //                     }
    //                     if (this.displayProfilePicture) {
    //                         // this.displayProfilePicture = base64;
    //                         localStorage.setItem('displayPicture', this.displayProfilePicture);
    //                     }
    //                     // console.log('uiBase => myProfile', this.myProfile);
    //                     // console.log('uiBase => myProfilePicture', this.myProfilePicture);
    //                     // console.log('uiBase => displayProfileName', this.displayProfileName);
    //                     // console.log('uiBase => displayProfilePicture', this.displayProfilePicture);
    //                     resolve(this.displayProfileName);
    //                 } else {
    //                     if (this.displayProfileName) {
    //                         this.displayProfileName = data.Name;
    //                         localStorage.setItem('displayName', JSON.stringify(this.displayProfileName));
    //                     }
    //                     if (this.displayProfilePicture) {
    //                         this.displayProfilePicture = base64;
    //                         localStorage.setItem('displayPicture', this.displayProfilePicture);
    //                     }
    //                     // console.log('uiBase => myProfile', this.myProfile);
    //                     // console.log('uiBase => myProfilePicture', this.myProfilePicture);
    //                     // console.log('uiBase => displayProfileName', this.displayProfileName);
    //                     // console.log('uiBase => displayProfilePicture', this.displayProfilePicture);
    //                     resolve(this.displayProfileName);
    //                 }
    //             });
    //         });
    //     });
    // }


    public getMyProfile() {
        return new Promise(resolve => {
            this.globalBase.getMyProfileDetails()
                .subscribe(data => {
                    this.myProfile = data;
                    localStorage.setItem('localStorageMyProfile', JSON.stringify(data));
                    // console.log ('Profile', this.myProfile.Id);
                    this.globalBase.getMyProfilePictureBase64(this.myProfile.Id).subscribe((base64: string) => {
                        this.myProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
                        localStorage.setItem('myProfilePictureBase64', base64);
                    });
                    resolve(this.myProfile);
                    console.log(this.myProfile);
                });
        });
    }


    public getMyPeers() {
        return new Promise(resolve => {
            // if (this.myProfile) {
            //   this.globalBase.getMyPeersDetails(this.myProfile.Id).subscribe(data => {
            //     data.forEach(ele => {
            //       this.tempProfile = [];
            //       this.tempProfilePicture = [];
            //       this.globalBase.getMyProfilePictureBase64(ele.Id).subscribe((base64: string) => {
            //         // this.tempProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
            //         this.tempProfilePicture = base64;
            //         this.tempProfile = ele;
            //         const profile = {
            //           profile: this.tempProfile,
            //           profilePicture: this.tempProfilePicture,
            //         };
            //         this.myPeers.push(profile);
            //       });
            //     });
            //     localStorage.setItem('myPeers', JSON.stringify(this.myPeers));
            //     resolve(this.myPeers);
            //   });
            // }
        });
    }


    public getMySubordinates() {
        return new Promise(resolve => {
            // if (this.myProfile) {
            //   this.globalBase.getMySubordinatesDetails(this.myProfile.Id).subscribe(data => {
            //     // console.log('uiBase => getMySubordinates', data);
            //     if (data.length > 0) {
            //       data.forEach(ele => {
            //         this.tempProfile = [];
            //         this.tempProfilePicture = [];
            //         this.globalBase.getMyProfilePictureBase64(ele.Id).subscribe((base64: string) => {
            //           // this.tempProfilePicture = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
            //           this.tempProfilePicture = base64;
            //           this.tempProfile = ele;
            //           const profile = {
            //             profile: this.tempProfile,
            //             profilePicture: this.tempProfilePicture,
            //           };
            //           this.mySubordinates.push(profile);
            //         });
            //       });
            //     }
            //     localStorage.setItem('mySubordinates', JSON.stringify(this.mySubordinates));
            //     resolve(this.mySubordinates);
            //   });
            // }
        });
    }


    // public getDisplayProfile() {
    //   return new Promise(resolve => {
    //     // console.log('uiBase => getDisplayProfile', this.appConfig);
    //     // console.log('uiBase => getDisplayProfile', this.appConfig[0].myProfileInfo[0].displayName);
    //     // console.log('uiBase => getDisplayProfile', this.appConfig[0].myProfileInfo[0].displayPicture);
    //     this.appConfig.forEach(ele => {

    //       if (ele) {
    //         console.log('uiBase => getDisplayProfile, appConfig', ele);
    //         ele.myProfileInfo.forEach(element => {
    //           if (element) {
    //             console.log('uiBase => getDisplayProfile, myProfileInfo', element);
    //             console.log('uiBase => getDisplayProfile, myProfileInfo', element[0].myProfile);
    //             // this.displayProfile.Name = eleMyProfileInfo.displayName;
    //             // this.displayProfile.Picture = eleMyProfileInfo.displayPicture;
    //             console.log('uiBase => getDisplayProfile, myProfileInfo', element.myProfile);
    //             console.log('uiBase => getDisplayProfile, myProfileInfo', element.myProfilePicture);
    //             console.log('uiBase => getDisplayProfile, displayName', element.displayName);
    //             console.log('uiBase => getDisplayProfile, displayPicture', element.displayPicture);

    //             this.displayProfile.Name = element.displayName;
    //             this.displayProfile.Picture = element.displayPicture;

    //             console.log('uiBase => getDisplayProfile, displayProfile.Name', this.displayProfile.Name);
    //             console.log('uiBase => getDisplayProfile, displayProfile.Picture', this.displayProfile.Picture);

    //             resolve(this.displayProfile);
    //             console.log('uiBase => getDisplayProfile, displayProfile', this.displayProfile);
    //           }
    //         });
    //       }
    //     });
    //   });
    // }

}
