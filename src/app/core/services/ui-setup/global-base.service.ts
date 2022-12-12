import { Injectable } from '@angular/core';
import { ApiBaseService } from './../api-related/api-base.service';

@Injectable()
export class GlobalBaseService {

    constructor(private apiBase: ApiBaseService) {
    }

    // GET My/Details
    getMyProfileDetails() {
        return this.apiBase.get('My/Details');
    }

    // GET Employee/{Id}/Picture/Base64
    getMyProfilePictureBase64(employeeId) {
        return this.apiBase.get('Employee/' + employeeId + '/Picture/Base64');
    }

    // GET Employee/{Id}/Peers
    getMyPeersDetails(employeeId) {
        return this.apiBase.get('Employee/' + employeeId + '/Peers');
    }

    // GET Employee/{Id}/Subordinates
    getMySubordinatesDetails(employeeId) {
        return this.apiBase.get('Employee/' + employeeId + '/Subordinates');
    }


    // getLocalStorageData(dataKeyName) {
    //     return new Promise((resolve, reject) => {
    //         const localStorageData = localStorage.getItem(dataKeyName);
    //         if (localStorageData !== null) {
    //             console.log('setLocalStorageData :::>> Success !!! Data was get Successfully', localStorageData);
    //             resolve(localStorageData);
    //         } else {
    //             console.log('setLocalStorageData :::>> Error occurred while getting the Data', localStorageData);
    //             reject(console.log('Error Occured'));
    //         }
    //     });
    // }


    // setLocalStorageData(dataToStore, dataKeyName) {
    //     return new Promise((resolve, reject) => {
    //         const localStorageData = localStorage.setItem(dataKeyName, (dataToStore));
    //         if (localStorageData !== null) {
    //             console.log('setLocalStorageData :::>> Success !!! Data was set Successfully', localStorageData);
    //             resolve(localStorageData);
    //         } else {
    //             console.log('setLocalStorageData :::>> Error occurred while setting the Data', localStorageData);
    //             reject(console.log('Error Occured'));
    //         }
    //     });
    // }

}
