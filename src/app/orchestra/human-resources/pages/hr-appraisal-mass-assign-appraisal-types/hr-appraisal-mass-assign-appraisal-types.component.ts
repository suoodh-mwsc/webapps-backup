import { Component, OnInit } from '@angular/core';
import { HrBaseService } from '../../../human-resources/shared/services/hr-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'app-hr-appraisal-mass-assign-appraisal-types',
  templateUrl: './hr-appraisal-mass-assign-appraisal-types.component.html',
  styleUrls: ['./hr-appraisal-mass-assign-appraisal-types.component.scss']
})
export class HrAppraisalMassAssignAppraisalTypesComponent implements OnInit {

  showLoader: boolean;

  // All Appraisal List
  allAppraisalList: any = [];
  allAppraisalListPaginationInfo: any = [];
  allAppraisals: any = [];

  // Update Appraisal List
  updateAppraisalList: any = [];

  organizationsAppraisals: any = [];


  constructor(
    private hrBase: HrBaseService) {
    this.getAppraisalList(10, 1, '');
    this.OrganizationsAppraisals();
  }

  ngOnInit() {
  }


  getAppraisalList(pageSize, pageNum, searchValue) {
    this.showLoader = true;
    // this.allAppraisalList.ShowDeleted = true;
    this.allAppraisalList.PageSize = pageSize;
    this.allAppraisalList.PageNumber = pageNum;
    this.allAppraisalList.SearchValue = searchValue;
    this.hrBase.postDefaultAppraisalTypes(
      {
        'SearchValue': this.allAppraisalList.SearchValue,
        'PageSize': this.allAppraisalList.PageSize,
        'PageNumber': this.allAppraisalList.PageNumber
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getAppraisalList data', data);
      this.allAppraisalListPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.allAppraisals.push(element);
      });
      console.log('getAppraisalList - shiftGroups Pagination ->', this.allAppraisalListPaginationInfo);
      console.log('getAppraisalList - shiftGroups Data ->', this.allAppraisals);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }


  postDefaultAppraisalTypesUpdate(updateAppraisal , AppraisalTypeId) {
    console.log('postDefaultAppraisalTypesUpdate', updateAppraisal);
    console.log('postDefaultAppraisalTypesUpdate', AppraisalTypeId);
    // this.updateAppraisalList.EmployeeId = updateAppraisal.EmployeeId;
    // this.updateAppraisalList.OrganizationsAppraisal_Id = updateAppraisal.OrganizationsAppraisal_Id;
    // this.hrBase.postDefaultAppraisalTypes(
    //   {
    //     'EmployeeId': this.updateAppraisalList.EmployeeId,
    //     'OrganizationsAppraisal_Id': this.updateAppraisalList.OrganizationsAppraisal_Id,
    //   }
    // ).subscribe((data: any) => {
    //   console.log('getAppraisalList data', data);
    //   updateAppraisal.OrganizationsAppraisal_Id = this.updateAppraisalList.OrganizationsAppraisal_Id;
    // },
    //   (error: Response | any) => {
    //     return Observable.throw(new Error(error.status));
    //   });
  }


  OrganizationsAppraisals() {
    this.showLoader = true;
    this.hrBase.getOrganizationsAppraisals().subscribe((data) => {
      this.showLoader = false;
      this.organizationsAppraisals = data;
      console.log('OrganizationsAppraisals', this.organizationsAppraisals);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

}
