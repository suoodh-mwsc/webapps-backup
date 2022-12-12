import { Component, OnInit } from '@angular/core';
import { DutyRosterBaseService } from '../../services/duty-roster-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { YodaService } from '../../../../../../services/yoda.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dutyroster-hr-approval',
  templateUrl: './dutyroster-hr-approval.component.html',
  styleUrls: ['./dutyroster-hr-approval.component.scss']
})
export class DutyrosterHrApprovalComponent implements OnInit {

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
  selectedYear: any;
  selectedWeek: any;
  weeklyShiftGroups: any;
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
  WeekNumberFilter: any;
  weekNumbersList: any[];
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

    // this.getAllShiftGroups(4, 1);
    this.getYears();
  }

  ngOnInit() {

  }

  // =============================================================
  // DutyRoster API Functions
  // =============================================================

  selectYear(year) {
    this.selectedYear = year;
    console.log('selectYear', this.selectedYear);
  }

  selectWeek(weekNum) {
    this.selectedWeek = weekNum;
    console.log('selectYear', this.selectedYear);
    console.log('selectedWeek', this.selectedWeek);
  }

  unSelectYear() {
    this.selectedYear = null;
  }

  unSelectWeek() {
    this.selectedWeek = null;
  }

  getWeeklyShiftGroups(selectedWeekNum, selectedYear) {
    this.dutyRosterBase.getWeeklyShiftsByWeekAndYear(selectedWeekNum, selectedYear).subscribe(data => {
      this.weeklyShiftGroups = data;
      console.log('getWeeklyShiftGroups weeklyShiftGroups', this.weeklyShiftGroups);
    });
  }

  // selectShiftGroup(shiftGroup) {
  //   this.dutyRosterBase.getShiftGroupById(shiftGroup.Id).subscribe(data => {
  //     this.selectedShiftGroup = data;
  //     if (this.selectedShiftGroup) {
  //       this.getWeeklyShiftsYearList();
  //     }
  //     console.log('selectShiftGroup selectedShiftGroup', this.selectedShiftGroup);
  //   });
  // }

  // unSelectShiftGroup() {
  //   this.selectedShiftGroup = null;
  //   this.selectedShiftGroupId = null;
  //   this.shiftGroups = [];
  //   this.getAllShiftGroups(4, 1);
  //   // this.getWeeklyShiftsYearList = null;
  //   this.selectedWeeklyShifts = null;
  //   this.yearList = [];
  //   this.selectedYear = null;
  // }

  // getAllShiftGroups(pageSize, pageNum) {
  //   this.allShiftGroup.ShowDeleted = true;
  //   this.allShiftGroup.PageSize = pageSize;
  //   this.allShiftGroup.PageNumber = pageNum;
  //   this.dutyRosterBase.postShiftGroupsAll(
  //     {
  //       'ShowDeleted': this.allShiftGroup.ShowDeleted,
  //       'PageSize': this.allShiftGroup.PageSize,
  //       'PageNumber': this.allShiftGroup.PageNumber
  //     }
  //   ).subscribe((data: any) => {
  //     console.log('getAllShiftGroups data', data);
  //     this.shiftGroupsPaginationInfo = data.PaginationInfo;
  //     data.Result.forEach(element => {
  //       this.shiftGroups.push(element);
  //     });
  //     console.log('getAllShiftGroups - shiftGroups Pagination ->', this.shiftGroupsPaginationInfo);
  //     console.log('getAllShiftGroups - shiftGroups Data ->', this.shiftGroups);
  //   });
  // }






  getWeeklyShiftsForYear(year) {
    this.selectedYear = year;
    this.dutyRosterBase.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroup.Id, year)
      .subscribe(data => {
        this.selectedWeeklyShifts = data;
        console.log('getWeeklyShiftsForYear - Data ->', this.selectedWeeklyShifts);
        // this.yearList = [];
      });
  }




  getWeeklyShiftChangeStatusToOpen(Id) {
    this.dutyRosterBase.getWeeklyShiftChangeStatusToOpen(Id)
      .subscribe(data => {
        console.log('getWeeklyShiftChangeStatusToOpen - Data ->', data);
        this.yearList = [];
        if (data) {
          this.dutyRosterBase.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroup.Id, this.selectedYear)
            .subscribe(value => {
              this.selectedWeeklyShifts = value;
              console.log('getWeeklyShiftsForYear - Data ->', this.selectedWeeklyShifts);
            });
        }
      });
  }

  getWeeklyShiftChangeStatusToClose(Id) {
    this.dutyRosterBase.getWeeklyShiftChangeStatusToClose(Id)
      .subscribe(data => {
        console.log('getWeeklyShiftChangeStatusToClose - Data ->', data);
        this.yearList = [];
        if (data) {
          this.dutyRosterBase.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroup.Id, this.selectedYear)
            .subscribe(value => {
              this.selectedWeeklyShifts = value;
              console.log('getWeeklyShiftsForYear - Data ->', this.selectedWeeklyShifts);
            });
        }
      });
  }





  getShiftGroupById() {
    this.dutyRosterBase.getShiftGroupById(this.selectedShiftGroupId)
      .subscribe(data => {
        this.shiftGroup = data;
      });
  }


  getYears() {
    this.weeklyShiftYears = [];
    var yearList;
    let i = 0;
    const max = 2;

    for (i = 0; i < max; i++) {
      yearList = moment().add(i, 'years').format('YYYY');
      this.Year = Number(yearList); // Convert String to Number
      this.weeklyShiftYearsFilter = { Id: i, Year: this.Year };
      this.weeklyShiftYears.push(this.weeklyShiftYearsFilter);
      this.yearList.push(this.weeklyShiftYearsFilter);
    }
    console.log('yearList', this.yearList);
    console.log('weeklyShiftYears', this.weeklyShiftYears);
  }


  getWeekNumbers() {
    this.weekNumbersList = [];
    let i = 1;
    const max = 53;

    for (i = 1; i < max; i++) {
      let WeekNumber = i;
      this.WeekNumberFilter = { Id: i, WeekNumber: WeekNumber };
      this.weekNumbersList.push(this.WeekNumberFilter);
    }
    console.log('getWeekNumbers', this.weekNumbersList);
  }

}
