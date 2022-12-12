import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../duty-roster/shared/services/duty-roster-base.service';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Component({
  selector: 'app-dutyroster',
  templateUrl: './dutyroster.component.html',
  styleUrls: ['./dutyroster.component.scss']
})
export class DutyrosterComponent implements OnInit {

  shiftGroups: any = [];
  shiftGroup: any;
  newShiftGroup: any = [];
  allShiftGroup: any = []; // getAllShiftGroups
  selectedShiftGroup: any;
  selectedShiftGroupId: any;
  shiftGroupsPaginationInfo: any;
  // =============================================================
  weeklyShifts: any = [];
  weeklyShift: any;
  newWeeklyShift: any = [];
  allWeeklyShift: any = [];
  weeklyShiftId: any;
  weeklyShiftsPaginationInfo: any;
  weeklyShiftPendingHRRelease: any;
  weeklyShiftRelease: any;
  yearList: any = [];
  // =============================================================
  shiftEmployees: any = [];
  newShiftEmployees: any = [];
  shiftEmployee: any;
  // =============================================================
  shiftsSupervisors: any = [];
  newShiftSupervisor: any = [];
  shiftsSupervisor: any;
  // =============================================================
  supervisorReleaseById: any;
  hrReleaseById: any;
  // =============================================================
  Id: any;
  Year: number;
  weeklyShiftYears: Array<any>;
  weeklyShiftYearsFilter: any;
  public Year1: any;
  public Year2: any;
  // =============================================================
  // Tables Load Model from row
  selectedRow: Number;
  setClickedRow: Function;
  // =============================================================
  selectedTab: any;

  selectedWeeklyShifts: any = null;

  constructor(
    private dutyRosterBase: DutyRosterBaseService
  ) {
    this.setClickedRow = function (index) {
      this.selectedRow = index;
    };

    this.weeklyShifts = [];
    this.shiftGroups = [];
    this.shiftGroupsPaginationInfo = [];
    this.weeklyShiftsPaginationInfo = [];
    this.selectedShiftGroupId = null;
    // this.getYears();
    this.selectedTab = 'shiftSupervisors';
  }

  ngOnInit() {
    this.getAllShiftGroups(4, 1);
    this.getYears();
  }

  // =============================================================
  // DutyRoster API Functions
  // =============================================================
  addNewShiftGroups() {
    this.dutyRosterBase.postShiftGroupsNew(
      {
        'Name': this.newShiftGroup.Name
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shift Group', 1000);
      console.log('Hooray!', 'You have added a new Shift Group');
      this.newShiftGroup.Name = null;
      this.shiftGroups.push(value);
    });
    
  }

  selectShiftGroup(shiftGroup) {
    this.dutyRosterBase.getShiftGroupById(shiftGroup.Id).subscribe(data => {
      this.selectedShiftGroup = data;
      console.log('selectShiftGroup selectedShiftGroup', this.selectedShiftGroup);
    })
  }

  unSelectShiftGroup() {
    this.selectedShiftGroup = null;
    this.selectedShiftGroupId = null;
    this.shiftGroups = [];
    this.getAllShiftGroups(4, 1);
  }

  getAllShiftGroups(pageSize, pageNum) {
    this.allShiftGroup.ShowDeleted = true;
    this.allShiftGroup.PageSize = pageSize;
    this.allShiftGroup.PageNumber = pageNum;
    this.dutyRosterBase.postShiftGroupsAll(
      {
        'ShowDeleted': this.allShiftGroup.ShowDeleted,
        'PageSize': this.allShiftGroup.PageSize,
        'PageNumber': this.allShiftGroup.PageNumber
      }
    ).subscribe((data: any) => {
      console.log('getAllShiftGroups data', data);
      this.shiftGroupsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.shiftGroups.push(element);
      });
      console.log('getAllShiftGroups - shiftGroups Pagination ->', this.shiftGroupsPaginationInfo);
      console.log('getAllShiftGroups - shiftGroups Data ->', this.shiftGroups);
    });
  }


  deleteShiftGroups(shiftGroup) {
    this.dutyRosterBase.deleteShiftGroupById(shiftGroup.Id)
      .subscribe((data: any) => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Deleted ShiftGroup Successfully', 1000);
        shiftGroup.IsDeleted = data.IsDeleted;
      });
  }


  restoreShiftGroups(shiftGroup) {
    this.dutyRosterBase.restoreShiftGroupById(shiftGroup.Id)
      .subscribe(data => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Restored ShiftGroup Successfully', 1000);
        shiftGroup.IsDeleted = data.IsDeleted;
      });
  }





  initializeWeeklyShiftsTab() {
    console.log('initializeWeeklyShiftsTab');
    this.selectedWeeklyShifts = null;
    this.getWeeklyShiftsYearList()
  }


  getWeeklyShiftsYearList() {
    this.dutyRosterBase.getWeeklyShiftYearsByShiftGroupId(this.selectedShiftGroup.Id)
      .subscribe(data => {
        this.yearList = data;
        console.log('getWeeklyShiftsYearList - yearList Data ->', this.yearList);
      });
  }


  getWeeklyShiftsForYear(year) {
    this.dutyRosterBase.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroup.Id, year)
      .subscribe(data => {
        this.selectedWeeklyShifts = data;

      });
  }





  addNewWeeklyShifts() {
    this.dutyRosterBase.postGenerateYearForWeeklyShift(
      {
        'Year': this.newWeeklyShift.Year,
        'ShiftGroup_Id': this.selectedShiftGroup.Id
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Weekly Shift for Year', 1000);
      console.log('Hooray!', 'You have added a new Weekly Shift');
      this.newWeeklyShift.Year = null;
      this.getWeeklyShiftsYearList();
    });
  }


  getPageDatax(event) {
    this.weeklyShifts = [];
    this.allWeeklyShift.ShowDeleted = true;
    if (event.pageSize > 0 && event.pageNo > 0) {
      this.allWeeklyShift.PageSize = event.pageSize;
      this.allWeeklyShift.PageNumber = event.pageNo;
    }

    if (event.pageSize <= 0 || event.pageNo <= 0) {
      this.allWeeklyShift.PageSize = 10;
      this.allWeeklyShift.PageNumber = 1;
    }
    console.log('getPageData allWeeklyShift.PageSize', this.allWeeklyShift.PageSize);
    console.log('getPageData allWeeklyShift.PageNumber', this.allWeeklyShift.PageNumber);

    this.dutyRosterBase.postWeeklyShiftAll(
      {
        'PageSize': this.allWeeklyShift.PageSize,
        'PageNumber': this.allWeeklyShift.PageNumber
      }
    ).subscribe(data => {
      console.log('getPageData data', data);
      this.weeklyShiftsPaginationInfo = data.PaginationInfo;
      // this.weeklyShifts = data.Result;
      data.Result.forEach(element => {
        if (this.selectedShiftGroupId === element.ShiftGroup_Id) {
          this.weeklyShifts.push(element);
        }
      });

      console.log('getPageData weeklyShifts', this.weeklyShifts);
      event = {
        event,
        pageNo: this.weeklyShiftsPaginationInfo.PageNumber,
        pageSize: this.weeklyShiftsPaginationInfo.PageSize,
        data: this.weeklyShifts
      };
    });
  }




  getShiftGroupById() {
    this.dutyRosterBase.getShiftGroupById(this.selectedShiftGroupId)
      .subscribe(data => {
        this.shiftGroup = data;
      });
  }


  addNewShiftEmployee() {
    this.dutyRosterBase.postShiftEmployeeNew(
      {
        'EmployeeId': this.newShiftEmployees.EmployeeId,
        'ShiftGroup_Id': this.selectedShiftGroup.Id
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shifts Employee', 1000);
      this.newShiftEmployees.EmployeeId = null;
      this.newShiftEmployees.ShiftGroup_Id = null;
      console.log(value);
      this.selectedShiftGroup.ShiftEmployees.push(value);
    });
  }


  deleteShiftEmployees(shiftEmployee) {
    this.dutyRosterBase.deleteShiftEmployeesById(shiftEmployee.Id)
      .subscribe(data => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Deleted ShiftEmployees  Successfully', 1000);
        shiftEmployee.IsRemoved = data.IsRemoved;
      });
  }


  restoreShiftEmployees(shiftEmployee) {
    this.dutyRosterBase.restoreShiftEmployeesById(shiftEmployee.Id)
      .subscribe(data => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Restore ShiftEmployees  Successfully', 1000);
        shiftEmployee.IsRemoved = data.IsRemoved;
      });
  }





  addNewShiftsSupervisor() {
    this.dutyRosterBase.postShiftsSupervisorNew(
      {
        'EmployeeId': this.newShiftSupervisor.EmployeeId,
        'ShiftGroup_Id': this.selectedShiftGroup.Id
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shifts Supervisor', 1000);
      this.newShiftSupervisor.EmployeeId = null;
      this.newShiftSupervisor.ShiftGroup_Id = null;
      this.selectedShiftGroup.ShiftSupervisors.push(value);
    });
  }

  deleteShiftsSupervisors(shiftsSupervisor) {
    this.dutyRosterBase.deleteShiftsSupervisorById(shiftsSupervisor.Id)
      .subscribe(data => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Deleted ShiftsSupervisors  Successfully', 1000);
        shiftsSupervisor.IsRemoved = data.IsRemoved;
      });
  }

  restoreShiftsSupervisors(shiftsSupervisor) {
    this.dutyRosterBase.restoreShiftsSupervisorById(shiftsSupervisor.Id)
      .subscribe(data => {
        this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Restore ShiftsSupervisors  Successfully', 1000);
        shiftsSupervisor.IsRemoved = data.IsRemoved;
      });
  }




  onKeydownAddShiftGroup(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftGroups();
    }
  }

  onKeydownAddWeeklyShift(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.addNewWeeklyShifts();
    }
  }

  onKeydownAddShiftsSupervisor(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftsSupervisor();
    }
  }

  onKeydownAddShiftEmployee(event) {
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftEmployee();
    }
  }

  selectActive(activeTab) {
    this.selectedTab = activeTab;

    if (activeTab === 'weeklyShifts') {
      this.selectedTab = 'weeklyShifts';
      console.log('selectActive', this.selectedTab);
    }

    if (activeTab === 'shiftSupervisors') {
      this.selectedTab = 'shiftSupervisors';
      console.log('selectActive', this.selectedTab);
    }

    if (activeTab === 'shiftEmployees') {
      this.selectedTab = 'shiftEmployees';
      console.log('selectActive', this.selectedTab);
    }
  }



  getWeeklyShiftPendingHRRelease() {
    this.dutyRosterBase.getWeeklyShiftPendingHRRelease()
      .subscribe(data => {
        this.weeklyShiftPendingHRRelease = data;
        console.log('getWeeklyShiftPendingHRRelease => Data', this.weeklyShiftPendingHRRelease);
      });
  }


  getWeeklyShiftSupervisorRelease(Id) {
    let weeklyShiftReleaseId = Id;
    this.dutyRosterBase.getWeeklyShiftSupervisorReleaseByWeeklyShiftId(weeklyShiftReleaseId)
      .subscribe(data => {
        this.weeklyShiftRelease = data;
        console.log('getWeeklyShiftSupervisorRelease => Data', this.weeklyShiftRelease);
      });
  }


  getWeeklyShiftHrRelease(Id) {
    let weeklyShiftReleaseId = Id;
    this.dutyRosterBase.getWeeklyShiftHrReleaseByWeeklyShiftId(weeklyShiftReleaseId)
      .subscribe(data => {
        this.weeklyShiftRelease = data;
        console.log('getWeeklyShiftHrRelease => Data', this.weeklyShiftRelease);
      });
  }



  getYears() {
    this.weeklyShiftYears = [];
    var yearList
    let i = 0;
    const max = 2;

    for (i = 0; i < max; i++) {
      yearList = moment().add(i, 'years').format('YYYY');
      this.Year = Number(yearList); // Convert String to Number
      this.weeklyShiftYearsFilter = { Id: i, Year: this.Year };
      this.weeklyShiftYears.push(this.weeklyShiftYearsFilter);
    }
    console.log('weeklyShiftYears', this.weeklyShiftYears);
  }

}
