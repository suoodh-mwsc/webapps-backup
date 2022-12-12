import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SelfCareBaseService } from '../../shared/services/self-care-base.service';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-my-staff-attendance-detail-report',
  templateUrl: './my-staff-attendance-detail-report.component.html',
  styleUrls: ['./my-staff-attendance-detail-report.component.scss']
})
export class MyStaffAttendanceDetailReportComponent implements OnInit {

  showLoader: boolean = false;
  showDetail: boolean = false;
  myDivisions: any = [];
  myDepartments: any = [];
  rollCallReport: any = [];

  dailyRollCallList: any = {};


  StatusList: any = [];


  constructor(private selfCareService: SelfCareBaseService) {

    this.StatusList = [
      { Id: 101, Status: 'Present' },
      { Id: 102, Status: 'AWOL' },
      { Id: 103, Status: 'Medical' },
      { Id: 104, Status: 'Compassionate' },
      // { Id: 105, Status: 'Other Leaves' },
    ];

  }

  ngOnInit() {
    this.showLoader = true;
    this.selfCareService.getAssingedDivisions().subscribe(data => {
      data.forEach(ele => {
        this.selfCareService.getDailyDivisionRollCallReport(ele.Division.Id).subscribe(rollcallData => {
          this.rollCallReport = rollcallData;
          console.log('this.rollCallReport', this.rollCallReport);

          if (this.rollCallReport && rollcallData) {
            if (ele.Division.Departments) {
              this.myDepartments = [];
              ele.Division.Departments.forEach(elem => {
                console.log('elem', elem);
                const department = {
                  DepartmentId: elem.Id,
                  DepartmentName: elem.Name,
                  Present: this.rollCallReport.filter(e => e.StatusDescription === 'Present' && e.Department.Name === elem.Name),
                  AWOL: this.rollCallReport.filter(e => e.StatusDescription === 'AWOL' && e.Department.Name === elem.Name),
                  Medical: this.rollCallReport.filter(e => e.StatusDescription === 'Medical' && e.Department.Name === elem.Name),
                  Compassionate: this.rollCallReport.filter(e => e.StatusDescription === 'Compassionate' && e.Department.Name === elem.Name),
                  AllAttendence: this.rollCallReport.filter(e => e.Department.Name === elem.Name),
                };

                this.myDepartments.push(department);
                console.log('this.myDepartments', this.myDepartments);
              });
            }

            const division = {
              DivisionId: ele.Division.Id,
              DivisionName: ele.Division.Name,
              Present: this.rollCallReport.filter(e => e.StatusDescription === 'Present' && e.Division.Name === ele.Division.Name),
              AWOL: this.rollCallReport.filter(e => e.StatusDescription === 'AWOL' && e.Division.Name === ele.Division.Name),
              Medical: this.rollCallReport.filter(e => e.StatusDescription === 'Medical' && e.Division.Name === ele.Division.Name),
              Compassionate: this.rollCallReport.filter(e => e.StatusDescription === 'Compassionate' && e.Division.Name === ele.Division.Name),
              AllAttendence: this.rollCallReport.filter(e => e.Division.Name === ele.Division.Name),
              Departments: this.myDepartments
            };

            this.myDivisions.push(division);
            this.myDepartments = [];

          }
          console.log('this.myDivisions', this.myDivisions);

          rollcallData = null;
        });
      });

      console.log('this.myDivisions', this.myDivisions);
      this.showLoader = false;

    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

  getAssingedDivisions() {
    this.showLoader = true;
    this.selfCareService.getAssingedDivisions().subscribe(data => {
      this.myDivisions = data;
      console.log('myDivisions', this.myDivisions);
      this.showLoader = false;

    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }


  getDailyDivisionRollCallReport(DivisionId) {
    this.showLoader = true;
    this.selfCareService.getDailyDivisionRollCallReport(DivisionId).subscribe(data => {
      this.rollCallReport = data;
      console.log('rollCallReport -> data', data);

      this.showLoader = false;

      return this.rollCallReport;
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

  showDetails() {
    this.showDetail = true;
  }

  hideDetails() {
    this.showDetail = false;
  }

}
