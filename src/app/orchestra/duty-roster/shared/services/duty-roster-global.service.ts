import { Injectable } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { DutyRosterBaseService } from './duty-roster-base.service';


@Injectable()
export class DutyRosterGlobalService {
    public myDetails: any[];
    public mySubordinates: any[];


    public myId: any;
    public myDomainId: any;
    public myName: any;
    public myMobileNumber: any;
    public myEmail: any;
    public myDesignation: any;
    public myDivision: any;
    public myDepartment: any;
    public mySection: any;


    constructor(
        private dutyRosterBase: DutyRosterBaseService) {
        this.getMwMyDetails();
        this.getMwMySubordinates();
    }

    public getMwMyDetails() {
        this.dutyRosterBase.getMyDetails()
            .subscribe(data => {
                this.myDetails = data;

                this.myId = data.Id;
                this.myDomainId = data.DomainId;
                this.myName = data.myName;
                this.myMobileNumber = data.MobileNumber;
                this.myEmail = data.Email;
                this.myDesignation = data.Designation;
                this.myDivision = data.Division;
                this.myDepartment = data.Department;
                this.mySection = data.Section;
                // console.log('getMwMyDetails - myDetails Data ->', this.myDetails);
                // console.log('myDetails - Id ->', this.myId );
            });
    }

    public getMwMySubordinates() {
        this.dutyRosterBase.getMySubordinates()
            .subscribe(data => {
                this.mySubordinates = data;
                // console.log('getMwMySubordinates - myDetails Data ->', this.mySubordinates);
            });
    }
}
