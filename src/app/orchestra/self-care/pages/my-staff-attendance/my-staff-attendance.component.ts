import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { SelfCareBaseService } from '../../shared/services/self-care-base.service';

import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-my-staff-attendance',
  templateUrl: './my-staff-attendance.component.html',
  styleUrls: ['./my-staff-attendance.component.scss']
})
export class MyStaffAttendanceComponent implements OnInit {
  dailyRollCallList: any = {};
  showLoader: boolean = false;
  disableAllButtons: boolean = false;

  constructor(private selfCareService: SelfCareBaseService) {

  }

  ngOnInit() {
    this.getDailyRollCallList();
  }

  getDailyRollCallList() {
    this.showLoader = true;
    this.selfCareService.getDailyRollCallList().subscribe(data => {
      this.dailyRollCallList = data;
      console.log('dailyRollCallList', this.dailyRollCallList);
      this.showLoader = false;
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

  dailyRollcall(dailyRollCallList) {
    console.log('DailyRollCallList ++++ >', dailyRollCallList);

    this.disableAllButtons = true;
    var postData = {
      RollCallItems: []
    };

    var hasErrors = false;

    dailyRollCallList.ActiveStaffs.forEach(element => {
      element.hasError = null;
      if (element.StatusId != null) {
        var RollCallItem = {
          EmployeeId: element.Employee.Id,
          StatusId: element.StatusId
        };
        postData.RollCallItems.push(RollCallItem);
      } else {
        element.hasError = true;
        hasErrors = true;
      }
    });

    if (!hasErrors) {
      this.selfCareService.postDailyRollCallUpdate(postData).subscribe(data => {
        this.dailyRollCallList = data;
        this.selfCareService.showGtsMsgBox('Hooray!', 'You have Successfully updated', 1000);
        this.disableAllButtons = false;
      }, (error: Response | any) => {
        this.disableAllButtons = false;
        return Observable.throw(new Error(error.status));
      });
    } else {
      this.disableAllButtons = false;
    }
  }


}
