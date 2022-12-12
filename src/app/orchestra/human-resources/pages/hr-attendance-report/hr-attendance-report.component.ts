import { Component, OnInit } from '@angular/core';
import { HrBaseService } from '../../shared/services/hr-base.service';
import { Observable } from 'rxjs/Observable';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

@Component({
  selector: 'app-hr-attendance-report',
  templateUrl: './hr-attendance-report.component.html',
  styleUrls: ['./hr-attendance-report.component.scss']
})
export class HrAttendanceReportComponent implements OnInit {

  rollcallDate: any;

  constructor(private hrBaseService: HrBaseService) {
  }

  ngOnInit() {
  }

  download(rollcallDate) {
    this.hrBaseService.getAttendanceReport(rollcallDate).subscribe(data => {
      let downloadData = [];
      let downloadHeader = {
        EmployeeId: 'Employee Id',
        Name: 'Name',
        Designation: 'Designation',
        Department: 'Department',
        Division: 'Division',
        Manager: 'Manager',
        OfficeLocation: 'Office Location',
        EmployeeType: 'EmployeeType',
        Status: 'Status',
        StatusDetail: 'Status Detail',
        DailyRollCallDetail: 'Daily Roll Call Detail',
      };
      downloadData.push(downloadHeader);

      let downloadLine: any;

      data.forEach(element => {
        // console.log('element', element)
        var managerInfo = element.Employee.Manager.Name.concat('(' + element.Employee.Manager.Id + ')');
        // console.log('managerInfo', managerInfo)
        downloadLine = {
          EmployeeId: element.Employee.Id,
          Name: element.Employee.Name,
          Designation: element.Employee.Designation,
          Department: element.Employee.Department,
          Division: element.Employee.Division,
          Manager: managerInfo,
          OfficeLocation: element.Employee.OfficeLocation,
          EmployeeType: element.EmployeeType,
          Status: element.Status,
          StatusDetail: element.StatusDetail,
          DailyRollCallDetail: element.DailyRollCallDetail,
        };
        // console.log('downloadLine', downloadLine);
        downloadData.push(downloadLine);
      });

      console.log('downloadData', downloadData);
      // tslint:disable-next-line:no-unused-expression
      new Angular5Csv(downloadData, 'Roll-Call-Report-' + rollcallDate);
      console.log('test');
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }
}
