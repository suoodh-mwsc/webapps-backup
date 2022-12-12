import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { DutyRosterBaseService } from './../../../duty-roster/shared/services/duty-roster-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import { YodaService } from './../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-dutyroster-my-dutyroster',
  templateUrl: './dutyroster-my-dutyroster.component.html',
  styleUrls: ['./dutyroster-my-dutyroster.component.scss']
})
export class DutyrosterMyDutyrosterComponent implements OnInit {
  topButtons: any;
  // =============================================================
  shiftGroups: any = [];
  weeklyShifts: any = [];
  shifts: any = [];
  shiftEmployees: any = [];
  shiftsSupervisors: any = [];

  employeeId: any;
  employeeName: any;

  shiftGroup: any;
  weeklyShift: any;
  shift: any;
  shiftEmployee: any;
  shiftsSupervisor: any;

  updateShiftGroupName: any;
  // =============================================================
  selectedWeekNo: any;
  // =============================================================
  // Selecting assigned ShiftGroups of Supervisor
  selectedShiftGroup: any;
  // assignedShiftGroups: any;
  selectedShiftGroupId: any;

  // =============================================================
  weekDetails: any;
  weekDetailsCancelled: any;
  shiftEmployeesDetails: any;       // Cancelled Shift data
  cancelShiftEmployeesDetails: any; // Cancelled Shift data
  shiftGroupsWeeklyShift: any;
  selectedWeeklyShift: number;
  shiftAddModalIsOff: boolean;
  shiftAddModalSelectedShift: any;

  shiftAssignedEmployees: any;
  shiftUnassignedEmployees: any;

  assignShiftDate: any;
  assignShiftStartTime: any;
  assignShiftEndTime: any;
  assignShiftSelectedShift: any;
  selectedShiftGroupShiftTemplateTimes: any = [];

  monthNames: any;
  editMode: boolean;
  selectedStaff: any;

  @ViewChild('shiftAddModel') public shiftAddModel: ModalDirective;
  // =============================================================

  constructor(
    private dutyRosterBase: DutyRosterBaseService
  ) {
    this.topButtons = [
      { title: 'Previous Week', weekNo: 0, year: 0 },
      { title: 'Current Week', weekNo: 0, year: 0 },
      { title: 'Next Week', weekNo: 0, year: 0 },
      { title: 'Upcoming Week', weekNo: 0, year: 0 }
    ];

    var sun = new Date();
    var mon = new Date();
    var tue = new Date();
    var wed = new Date();
    var thu = new Date();
    var fri = new Date();
    var sat = new Date();

    this.weekDetails = [
      { date: sun, normalShifts: [], offShifts: [] },
      { date: mon, normalShifts: [], offShifts: [] },
      { date: tue, normalShifts: [], offShifts: [] },
      { date: wed, normalShifts: [], offShifts: [] },
      { date: thu, normalShifts: [], offShifts: [] },
      { date: fri, normalShifts: [], offShifts: [] },
      { date: sat, normalShifts: [], offShifts: [] },
    ];

    this.weekDetailsCancelled = [
      { date: sun, normalShifts: [], offShifts: [] },
      { date: mon, normalShifts: [], offShifts: [] },
      { date: tue, normalShifts: [], offShifts: [] },
      { date: wed, normalShifts: [], offShifts: [] },
      { date: thu, normalShifts: [], offShifts: [] },
      { date: fri, normalShifts: [], offShifts: [] },
      { date: sat, normalShifts: [], offShifts: [] },
    ];


    // tslint:disable-next-line:max-line-length
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.editMode = true;
    this.selectedStaff = null;
    // this.assignedShiftGroups = [];
    // this.shiftGroupsPaginationInfo = [];
    this.selectedShiftGroupId = null;

    this.getMyShiftGroups();
    this.getTopButtonDetails();
  }

  ngOnInit() {
  }

  selectShiftGroup(shiftGroup) {
    this.selectedShiftGroup = shiftGroup;
    this.selectedShiftGroupId = this.selectedShiftGroup.Id;
    // console.log('selectShiftGroup - selectedShiftGroupId Data ->', this.selectedShiftGroupId);
    this.getWeekDetails(this.topButtons[1].weekNo, this.topButtons[1].year);
  }

  unSelectShiftGroup() {
    this.selectedShiftGroup = null;
    this.selectedShiftGroupId = null;
  }


  getMyShiftGroups() {
    this.dutyRosterBase.getShiftGroupsAssignedToMe().subscribe(data => {
      // console.log('getAllShiftGroups data', data);
      this.shiftGroups = data;
      this.selectShiftGroup(this.shiftGroups);
    });
  }


  getTopButtonDetails() {
    return new Promise(resolve => {
      this.dutyRosterBase.getCurrentWeekDetails().subscribe(data => {
        this.setWeekDetailsInTopButton(0, (data.WeekNo - 1), (data.Year));
        this.setWeekDetailsInTopButton(1, (data.WeekNo), (data.Year));
        this.setWeekDetailsInTopButton(2, (data.WeekNo + 1), (data.Year));
        this.setWeekDetailsInTopButton(3, (data.WeekNo + 2), (data.Year));
        resolve();
      });
    });
  }


  showStaffStuff(shiftEmployeesDetail) {
    if (this.selectedStaff === shiftEmployeesDetail) {
      this.selectedStaff = null;
    } else {
      this.selectedStaff = shiftEmployeesDetail;
    }
  }

  showAllStaffStuff() {
    this.selectedStaff = null;
  }

  getWeekDetails(weekNo, year) {
    this.selectedWeekNo = weekNo;
    if (this.selectedShiftGroup !== null && weekNo !== null && year !== null) {
      this.dutyRosterBase.getShiftGroupsByShiftGroupId(this.selectedShiftGroupId, weekNo, year)
        .subscribe(shiftGroupData => {

          var sun = new Date(shiftGroupData.StartsOn);
          var mon = new Date(shiftGroupData.StartsOn);
          var tue = new Date(shiftGroupData.StartsOn);
          var wed = new Date(shiftGroupData.StartsOn);
          var thu = new Date(shiftGroupData.StartsOn);
          var fri = new Date(shiftGroupData.StartsOn);
          var sat = new Date(shiftGroupData.StartsOn);
          console.log('sun.getDate()', sun.getDate());
          mon.setDate(sun.getDate() + 1);
          tue.setDate(sun.getDate() + 2);
          wed.setDate(sun.getDate() + 3);
          thu.setDate(sun.getDate() + 4);
          fri.setDate(sun.getDate() + 5);
          sat.setDate(sun.getDate() + 6);

          this.selectedWeeklyShift = shiftGroupData.Id;
          this.shiftGroupsWeeklyShift = shiftGroupData;
          shiftGroupData.ShiftTemplate.Times.forEach(ele => {
            this.selectedShiftGroupShiftTemplateTimes.push(ele);
          });

          this.weekDetails = [
            {
              date: sun,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sun.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sun.getDate() && e.IsOff === true),
            },
            {
              date: mon,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === mon.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === mon.getDate() && e.IsOff === true)
            },
            {
              date: tue,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === tue.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === tue.getDate() && e.IsOff === true)
            },
            {
              date: wed,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === wed.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === wed.getDate() && e.IsOff === true)
            },
            {
              date: thu,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === thu.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === thu.getDate() && e.IsOff === true)
            },
            {
              date: fri,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === fri.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === fri.getDate() && e.IsOff === true)
            },
            {
              date: sat,
              normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sat.getDate() && e.IsOff === false),
              offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sat.getDate() && e.IsOff === true)
            }
          ];

          this.shiftEmployeesDetails = shiftGroupData.ShiftGroup.ShiftEmployees;
          this.summarizeDutyDetails();
          // let thisWeek = weekNo;
          // let thisYear = year;
        },
          (error: Response | any) => {
            return Observable.throw(new Error(error.status));
          });
    }
  }

  getShiftsByDateAndShiftTime(weekDetail, shiftTime): any {
    let shiftStartTime = new Date(weekDetail.date);
    shiftStartTime.setHours(shiftTime.StartingHour);
    shiftStartTime.setMinutes(shiftTime.StartingMinute);

    let shiftEndTime = new Date(weekDetail.date);
    shiftEndTime.setHours(shiftTime.EndingHour);
    shiftEndTime.setMinutes(shiftTime.EndingMinute);

    let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => e.CancelledOn === null && ((new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === false));

    if (this.selectedStaff) {
      shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
    }

    return shifts;
  }

  // getCancelledShiftsByDateAndShiftTime(weekDetail, shiftTime): any {
  //   let shiftStartTime = new Date(weekDetail.date);
  //   shiftStartTime.setHours(shiftTime.StartingHour);
  //   shiftStartTime.setMinutes(shiftTime.StartingMinute);
  //   let shiftEndTime = new Date(weekDetail.date);
  //   shiftEndTime.setHours(shiftTime.EndingHour);
  //   shiftEndTime.setMinutes(shiftTime.EndingMinute);
  //   let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => e.CancelledOn !== null && ((new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === false));
  //   if (this.selectedStaff) {
  //     shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
  //   }
  //   return shifts;
  // }

  // getOffShiftsByDateAndShiftTime(weekDetail, shiftTime): any {
  //   let shiftStartTime = new Date(weekDetail.date);
  //   shiftStartTime.setHours(shiftTime.StartingHour);
  //   shiftStartTime.setMinutes(shiftTime.StartingMinute);
  //   let shiftEndTime = new Date(weekDetail.date);
  //   shiftEndTime.setHours(shiftTime.EndingHour);
  //   shiftEndTime.setMinutes(shiftTime.EndingMinute);
  //   let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === true);
  //   if (this.selectedStaff) {
  //     shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
  //   }
  //   return shifts;
  // }


  // getWeekDetailsCancel(weekNo, year) {
  //   var selectedShiftGroupId = this.selectedShiftGroupId;
  //   console.log('getWeekDetailsCancel -> selectedShiftGroupId', this.selectedShiftGroup);
  //   this.dutyRosterBase.getWeekDetails(year, weekNo).subscribe(data => {
  //     var sun = new Date(data.StartDate);
  //     var mon = new Date(data.StartDate);
  //     var tue = new Date(data.StartDate);
  //     var wed = new Date(data.StartDate);
  //     var thu = new Date(data.StartDate);
  //     var fri = new Date(data.StartDate);
  //     var sat = new Date(data.StartDate);

  //     mon.setDate(sun.getDate() + 1);
  //     tue.setDate(sun.getDate() + 2);
  //     wed.setDate(sun.getDate() + 3);
  //     thu.setDate(sun.getDate() + 4);
  //     fri.setDate(sun.getDate() + 5);
  //     sat.setDate(sun.getDate() + 6);

  //     console.log('getWeekDetailsCancel -> selectedWeeklyShift->', this.selectedWeeklyShift);
  //     this.dutyRosterBase.getWeeklyShiftCancelledShiftsByWeeklyShiftId(this.selectedWeeklyShift)
  //       .subscribe(cancelShiftData => {
  //         console.log('getWeekDetailsCancel -> cancelShiftData', cancelShiftData);

  //         this.weekDetailsCancelled = [
  //           {
  //             date: sun,
  //             normalShifts: cancelShiftData.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sun.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sun.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: mon,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === mon.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === mon.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: tue,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === tue.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === tue.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: wed,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === wed.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === wed.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: thu,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === thu.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === thu.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: fri,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === fri.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === fri.getDate() && e.IsOff === true)
  //           },
  //           {
  //             date: sat,
  //             normalShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sat.getDate() && e.IsOff === false),
  //             offShifts: cancelShiftData.Shifts.Shifts.filter(e => (new Date(e.StartsOn)).getDate() === sat.getDate() && e.IsOff === true)
  //           }
  //         ];
  //         console.log('getWeekDetailsCancel -> weekDetailsCancelled ', this.weekDetailsCancelled);
  //         this.cancelShiftEmployeesDetails = cancelShiftData.ShiftEmployees;
  //       });
  //   });
  // }

  private summarizeDutyDetails() {
    this.dutyRosterBase.getMyDetails().subscribe(myDetails => {
      this.shiftEmployeesDetails.forEach(shiftEmployeesDetail => {
        if (shiftEmployeesDetail.EmployeeId === myDetails.Id) {
          this.selectedStaff = shiftEmployeesDetail;
        }
        shiftEmployeesDetail.noOfNormalShifts = 0;
        shiftEmployeesDetail.noOfOffShifts = 0;
        this.weekDetails.forEach(weekDetail => {
          let noOfnormalShifts = weekDetail.normalShifts.filter(e => e.CancelledOn === null && e.ShiftEmployee.Id === shiftEmployeesDetail.Id).length;
          let noOfoffShifts = weekDetail.offShifts.filter(e => e.CancelledOn === null && e.ShiftEmployee.Id === shiftEmployeesDetail.Id).length;
          shiftEmployeesDetail.noOfNormalShifts += noOfnormalShifts;
          shiftEmployeesDetail.noOfOffShifts += noOfoffShifts;
        });
      });
    });
  }

  private setWeekDetailsInTopButton(buttonIndex, weekNo, year) {
    if (weekNo < 1) {
      weekNo = 52;
      year = year - 1;
    }
    if (weekNo > 52) {
      weekNo = weekNo - 52;
      year = year + 1;
    }
    this.topButtons[buttonIndex].weekNo = weekNo;
    this.topButtons[buttonIndex].year = year;
  }

}
