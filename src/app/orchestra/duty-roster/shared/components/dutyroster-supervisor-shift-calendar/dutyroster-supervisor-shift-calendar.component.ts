import { Component, OnInit, ElementRef, ViewChild, TemplateRef, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../../duty-roster/shared/services/duty-roster-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import { YodaService } from './../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
import { Console } from '@angular/core/src/console';
declare var Swal: any;

@Component({
  selector: 'app-dutyroster-supervisor-shift-calendar',
  templateUrl: './dutyroster-supervisor-shift-calendar.component.html',
  styleUrls: ['./dutyroster-supervisor-shift-calendar.component.scss']
})
export class DutyrosterSupervisorShiftCalendarComponent implements OnInit {

  // UI Related
  topButtons: any; // Tab View Days
  // Shift Groups ================================================
  shiftGroups: any = [];
  shiftEmployees: any = [];

  shiftGroupShowLoader: boolean;
  // =============================================================
  // Selecting assigned ShiftGroups of Supervisor
  shiftGroupsPaginationInfo: any;
  // selectedShiftGroup: any;
  selectedShiftGroupChild: any;
  shiftGroupsPaginationLocal: any;
  selectedShiftGroupChildId: any;
  // =============================================================
  week: any;
  weekDetails: any;
  weekDetailsCancelled: any;
  shiftEmployeesDetails: any;       // Cancelled Shift data
  cancelShiftEmployeesDetails: any; // Cancelled Shift data
  shiftGroupsWeeklyShift: any = [];
  selectedWeeklyShift: number;
  shiftAddModalIsOff: boolean;
  shiftAddModalAssignedEmployees: any;
  // ShiftAssignModal  ===========================================
  shiftAddModalUnassignedEmployees: any;
  assignShiftDate: any;
  assignShiftStartTime: any;
  assignShiftEndTime: any;
  assignShiftSelectedShift: any;
  assignShiftSelectedShiftTemplateTime: any;

  // filterShiftStartTime: any = [];
  // filterShiftEndTime: any = [];
  selectedShiftGroupShiftTemplateTimes: any = [];
  // New Shift  ==================================================
  todayDate: any;
  thisYear: any;
  thisWeekNum: any;
  monthNames: any;
  editMode: boolean; // ShiftAssign Edit Mode Check
  selectedStaff: any;

  showCancelledHistory: boolean;

  selectedWeekNo: any;

  // @ViewChild('shiftAddModel') shiftAddModel: TemplateRef<any>;
  @ViewChild('shiftAddModel') public shiftAddModel: ModalDirective;
  // =============================================================

  @Input('selectedShiftGroupParent') selectedShiftGroup: any;
  @Input() shiftCalenderShowLoader: any;

  constructor(
    private dutyRosterBase: DutyRosterBaseService,
    private yoda: YodaService) {

    //====================================================
    // this.selectedShiftGroup = {};
    this.selectedShiftGroupChild = this.selectedShiftGroup;
    console.log('selectedShiftGroupChild', this.selectedShiftGroupChild);
    this.shiftCalenderShowLoader = false;
    //=====================================================

    this.todayDate = moment().toISOString();
    this.thisYear = moment().format('YYYY');
    this.thisWeekNum = moment(this.todayDate).week();

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
    this.shiftGroupsPaginationLocal = [];
    this.shiftGroupsPaginationInfo = [];
    this.selectedShiftGroupChildId = null;

    // this.getAllShiftGroups(4, 1);
    this.getTopButtonDetails();

    if (!this.selectedShiftGroupChild == null && !this.topButtons[1].weekNo == null) {
      this.dutyRosterBase.getShiftGroupById(this.selectedShiftGroupChild.Id).subscribe(data => {
        this.selectedShiftGroupChild = data;
        this.getWeekDetailsFromYoda(this.topButtons[1].weekNo, this.topButtons[1].year);
      }, (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
    }



    // new Promise(resolve => {
    //   this.dutyRosterBase.getShiftGroupById(this.selectedShiftGroupChild.Id).subscribe(data => {
    //     this.selectedShiftGroupChild = data;
    //     resolve();
    //   });
    // });

  }

  ngOnInit() {
  }


  toggleshowCancelledHistory() {
    if (this.showCancelledHistory) {
      this.showCancelledHistory = false;
    } else {
      this.showCancelledHistory = true;
    }
  }


  unSelectShiftGroup() {
    this.selectedShiftGroupChild = null;
    this.shiftGroupsWeeklyShift = null;
    this.weekDetails = null;
    this.weekDetailsCancelled = null;
    this.shiftEmployeesDetails = null;
    // this.getAllShiftGroups(4, 1);
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


  zshowShiftAssignModal(weekDetail, shiftTempateTimes, isOff) {
    if (this.editMode) {
      this.assignShiftSelectedShiftTemplateTime = shiftTempateTimes;
      let selectedShift = this.getShiftsByDateAndShiftTime(weekDetail, shiftTempateTimes);
      this.shiftAddModalIsOff = false;
      if (isOff) {
        this.shiftAddModalIsOff = true;
      }
      this.assignShiftSelectedShift = weekDetail;
      this.assignShiftDate = weekDetail.date;

      var ShiftStart = new Date();
      ShiftStart.setHours(shiftTempateTimes.StartingHour); ShiftStart.setMinutes(shiftTempateTimes.StartingMinute); ShiftStart.setSeconds(0);
      var ShiftEnd = new Date();
      ShiftEnd.setHours(shiftTempateTimes.EndingHour); ShiftEnd.setMinutes(shiftTempateTimes.EndingMinute); ShiftEnd.setSeconds(0);

      this.assignShiftStartTime = moment(ShiftStart).format('HH:mm');
      this.assignShiftEndTime = moment(ShiftEnd).format('HH:mm');
      this.shiftAddModalUnassignedEmployees = [];
      if (this.selectedStaff) {
        // console.log('this.selectedStaff', this.selectedStaff)
        if (this.selectedStaff.IsRemoved === false) {
          this.shiftAddModalUnassignedEmployees.push(this.selectedStaff);
        }
      } else {
        this.shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees.forEach(element => {
          if (element.IsRemoved === false) {
            // console.log('shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees element', element)
            this.shiftAddModalUnassignedEmployees.push(element);
          }
        });
      }

      this.shiftAddModalAssignedEmployees = [];
      selectedShift.forEach(element => {
        // console.log('shiftAddModalAssignedEmployees selectedShift', element)
        if (!this.selectedStaff) {
          // console.log('this.selectedStaff', this.selectedStaff)
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        } else if (this.selectedStaff && this.selectedStaff.EmployeeId === element.ShiftEmployee.EmployeeId) {
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        }
        this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
          if (shiftUnassignedEmployee.Id === element.ShiftEmployee.Id) {
            var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
            this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
          }
        });
      });

      this.shiftAddModel.show();
    }
  }


  showShiftAssignModal(selectedShift, selectedShiftsDate, selectedShiftStartTimeHour, selectedShiftStartTimeMinute, selectedShiftEndTimeHour, selectedShiftEndTimeMinute, isOff) {
    if (this.editMode) {
      this.shiftAddModalIsOff = false;
      if (isOff) {
        this.shiftAddModalIsOff = true;
      }
      this.assignShiftSelectedShift = selectedShift;
      console.log('showShiftAssignModal assignShiftSelectedShift', selectedShift);
      this.assignShiftDate = selectedShiftsDate;

      var ShiftStart = new Date();
      ShiftStart.setHours(selectedShiftStartTimeHour); ShiftStart.setMinutes(selectedShiftStartTimeMinute); ShiftStart.setSeconds(selectedShiftStartTimeMinute);
      var ShiftEnd = new Date();
      ShiftEnd.setHours(selectedShiftEndTimeHour); ShiftEnd.setMinutes(selectedShiftEndTimeMinute); ShiftEnd.setSeconds(selectedShiftEndTimeMinute);

      this.assignShiftStartTime = moment(ShiftStart).format('HH:mm');
      this.assignShiftEndTime = moment(ShiftEnd).format('HH:mm');

      this.shiftAddModalUnassignedEmployees = [];
      if (this.selectedStaff) {
        if (this.selectedStaff.IsRemoved === false) {
          this.shiftAddModalUnassignedEmployees.push(this.selectedStaff);
        }
      } else {
        this.shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees.forEach(element => {
          if (element.IsRemoved === false) {
            // console.log('shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees element', element)
            this.shiftAddModalUnassignedEmployees.push(element);
          }
        });
      }

      this.shiftAddModalAssignedEmployees = [];

      selectedShift.normalShifts.forEach(element => {
        if (!this.selectedStaff) {
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        } else if (this.selectedStaff && this.selectedStaff.EmployeeId === element.ShiftEmployee.EmployeeId) {
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        }
        this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
          if (shiftUnassignedEmployee.Id === element.ShiftEmployee.Id) {
            var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
            this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
          }
        });
      });

      this.shiftAddModel.show();
    }
  }


  assignStafftoShift(selectedStaff) {
    if (this.shiftAddModalIsOff) {
      this.newOff(selectedStaff);
    } else {
      this.znewShift(selectedStaff);
    }
  }


  znewShift(selectedStaff) {
    var zeDate = this.assignShiftDate.getDate() + ' ' + this.monthNames[this.assignShiftDate.getMonth()] + ' ' + (this.assignShiftDate.getYear() + 1900);
    var dataBody = {
      'StartsOn': zeDate + ' ' + this.assignShiftStartTime,
      'EndsOn': zeDate + ' ' + this.assignShiftEndTime,
      'ShiftEmployee_Id': selectedStaff.Id,
      'WeeklyShift_Id': this.shiftGroupsWeeklyShift.Id,
      'ShiftTemplateTime_Id': this.assignShiftSelectedShiftTemplateTime.Id
    };
    this.dutyRosterBase.postShiftNew(dataBody).subscribe(value => {
      this.shiftGroupsWeeklyShift.Shifts.push(value);
      console.log('this.shiftGroupsWeeklyShift', this.shiftGroupsWeeklyShift);
      this.assignShiftSelectedShift.normalShifts.push(value);
      this.shiftAddModalAssignedEmployees.push(value);
      this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
        if (shiftUnassignedEmployee.Id === selectedStaff.Id) {
          var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
          this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
        }
      });
      this.getWeekDetails();
    });
  }


  showOffShiftAssignModal(selectedShift, selectedShiftsDate, selectedShiftStartTime, selectedShiftEndTime, isOff) {
    if (this.editMode) {
      this.shiftAddModalIsOff = false;
      if (isOff) {
        this.shiftAddModalIsOff = true;
      }
      this.assignShiftSelectedShift = selectedShift;
      this.assignShiftDate = selectedShiftsDate;
      this.assignShiftStartTime = selectedShiftStartTime;
      this.assignShiftEndTime = selectedShiftEndTime;
      this.shiftAddModalUnassignedEmployees = [];
      if (this.selectedStaff) {
        if (this.selectedStaff.IsRemoved === false) {
          this.shiftAddModalUnassignedEmployees.push(this.selectedStaff);
        }
      } else {
        this.shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees.forEach(element => {
          if (element.IsRemoved === false) {
            // console.log('shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees element', element)
            this.shiftAddModalUnassignedEmployees.push(element);
          }
        });
      }

      this.shiftAddModalAssignedEmployees = [];
      selectedShift.offShifts.forEach(element => {
        if (!this.selectedStaff) {
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        } else if (this.selectedStaff && this.selectedStaff.EmployeeId === element.ShiftEmployee.EmployeeId) {
          // if (element.ShiftEmployee.IsRemoved === false) {
          this.shiftAddModalAssignedEmployees.push(element);
          // }
        }
        this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
          if (shiftUnassignedEmployee.Id === element.ShiftEmployee.Id) {
            var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
            this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
          }
        });
      });
      this.shiftAddModel.show();
    }
  }


  newOff(selectedStaff) {
    var zeDate = this.assignShiftDate.getDate() + ' ' + this.monthNames[this.assignShiftDate.getMonth()] + ' ' + (this.assignShiftDate.getYear() + 1900);
    var dataBody = {
      'OffDate': zeDate,
      'ShiftEmployee_Id': selectedStaff.Id,
      'WeeklyShift_Id': this.shiftGroupsWeeklyShift.Id
    };
    this.dutyRosterBase.postShiftNewOff(dataBody).subscribe(value => {
      this.assignShiftSelectedShift.normalShifts.push(value);
      this.shiftAddModalAssignedEmployees.push(value);
      this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
        if (shiftUnassignedEmployee.Id === selectedStaff.Id) {
          var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
          this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
        }
      });
      this.shiftGroupsWeeklyShift.Shifts.push(value);
      this.getWeekDetails();
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }


  unAssignStafftoShift(selectedShift) {
    this.dutyRosterBase.getShiftRemove(selectedShift.Id).subscribe(value => {
      this.shiftAddModalUnassignedEmployees.push(selectedShift.ShiftEmployee);
      this.shiftAddModalAssignedEmployees.forEach(element => {
        if (element.ShiftEmployee.Id === selectedShift.ShiftEmployee.Id) {
          var removeIndex = this.shiftAddModalAssignedEmployees.indexOf(element);
          this.shiftAddModalAssignedEmployees.splice(removeIndex, 1);
        }
      });
      this.assignShiftSelectedShift.normalShifts.forEach(element => {
        if (element.Id === selectedShift.Id) {
          var removeIndex = this.assignShiftSelectedShift.normalShifts.indexOf(element);
          this.assignShiftSelectedShift.normalShifts.splice(removeIndex, 1);
        }
      });
      this.shiftGroupsWeeklyShift.Shifts.forEach(element => {
        if (element.Id === selectedShift.Id) {
          var removeIndex = this.shiftGroupsWeeklyShift.Shifts.indexOf(element);
          this.shiftGroupsWeeklyShift.Shifts.splice(removeIndex, 1);
        }
      });
      this.getWeekDetails();
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }


  getWeekDetails() {
    var sun = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var mon = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var tue = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var wed = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var thu = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var fri = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    var sat = new Date(this.shiftGroupsWeeklyShift.StartsOn);
    // console.log('sun.getDate()', sun.getDate());
    mon.setDate(sun.getDate() + 1);
    tue.setDate(sun.getDate() + 2);
    wed.setDate(sun.getDate() + 3);
    thu.setDate(sun.getDate() + 4);
    fri.setDate(sun.getDate() + 5);
    sat.setDate(sun.getDate() + 6);

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
    this.summarizeDutyDetails();
  }

  getWeekDetailsFromYoda(weekNo, year) {
    this.selectedWeekNo = weekNo;
    if (this.selectedShiftGroupChild !== null && weekNo !== null && year !== null) {
      this.dutyRosterBase.getShiftGroupsByShiftGroupId(this.selectedShiftGroupChild.Id, weekNo, year)
        .subscribe(shiftGroupData => {
          this.selectedWeeklyShift = shiftGroupData.Id;
          this.shiftGroupsWeeklyShift = shiftGroupData;
          shiftGroupData.ShiftTemplate.Times.forEach(ele => {
            this.selectedShiftGroupShiftTemplateTimes.push(ele);
          });
          console.log('getWeekDetailsFromYoda -> weekDetails', this.weekDetails);
          console.log('getWeekDetailsFromYoda -> shiftGroupData', shiftGroupData);
          this.shiftEmployeesDetails = shiftGroupData.ShiftGroup.ShiftEmployees;

          this.getWeekDetails();
        }, (error: Response | any) => {
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

    let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => e.CancelledOn === null && e.ShiftTemplatesTime_Id === shiftTime.Id && ((new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === false));

    if (this.selectedStaff) {
      shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
    }

    return shifts;
  }

  getCancelledShiftsByDateAndShiftTime(weekDetail, shiftTime): any {
    let shiftStartTime = new Date(weekDetail.date);
    shiftStartTime.setHours(shiftTime.StartingHour);
    shiftStartTime.setMinutes(shiftTime.StartingMinute);

    let shiftEndTime = new Date(weekDetail.date);
    shiftEndTime.setHours(shiftTime.EndingHour);
    shiftEndTime.setMinutes(shiftTime.EndingMinute);

    let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => e.CancelledOn !== null && e.ShiftTemplatesTime_Id === shiftTime.Id && ((new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === false));

    if (this.selectedStaff) {
      shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
    }

    return shifts;
  }

  getOffShiftsByDateAndShiftTime(weekDetail, shiftTime): any {
    let shiftStartTime = new Date(weekDetail.date);
    shiftStartTime.setHours(shiftTime.StartingHour);
    shiftStartTime.setMinutes(shiftTime.StartingMinute);

    let shiftEndTime = new Date(weekDetail.date);
    shiftEndTime.setHours(shiftTime.EndingHour);
    shiftEndTime.setMinutes(shiftTime.EndingMinute);

    let shifts = this.shiftGroupsWeeklyShift.Shifts.filter(e => (new Date(e.StartsOn)).getTime() === shiftStartTime.getTime() && (new Date(e.EndsOn)).getTime() === shiftEndTime.getTime() && e.IsOff === true);

    if (this.selectedStaff) {
      shifts = shifts.filter(e => e.ShiftEmployee.EmployeeId === this.selectedStaff.EmployeeId);
    }
    return shifts;
  }


  private summarizeDutyDetails() {
    this.shiftEmployeesDetails.forEach(shiftEmployeesDetail => {
      shiftEmployeesDetail.noOfNormalShifts = 0;
      shiftEmployeesDetail.noOfOffShifts = 0;
      this.weekDetails.forEach(weekDetail => {
        let noOfnormalShifts = weekDetail.normalShifts.filter(e => e.CancelledOn === null && e.ShiftEmployee.Id === shiftEmployeesDetail.Id).length;
        let noOfoffShifts = weekDetail.offShifts.filter(e => e.CancelledOn === null && e.ShiftEmployee.Id === shiftEmployeesDetail.Id).length;
        shiftEmployeesDetail.noOfNormalShifts += noOfnormalShifts;
        shiftEmployeesDetail.noOfOffShifts += noOfoffShifts;
      });
    });
  }


  getWeeklyShiftSupervisorRelease(weeklyShift) {
    // console.log('getWeeklyShiftSupervisorRelease', weeklyShift);
    if (!this.shiftGroupsWeeklyShift.ReleasedOn) {
      Swal({
        title: 'Release this shiftWeek?',
        text: 'Do you want Release this shiftweek?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Confirmed!',
        cancelButtonText: 'Cancel Request!',
        // closeOnConfirm: true,
        // closeOnCancel: true,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          console.log('Release :', 'WeeklyShift', weeklyShift);
          this.dutyRosterBase.getWeeklyShiftChangeStatusReleaseByWeeklyShiftId(weeklyShift.Id).subscribe(value => {
            this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Approved WeeklyShift ', 1000);
            console.log('Hooray! You have Approved WeeklyShift', value.Id, 'weeklyShift', weeklyShift);
            console.log('DisplayweeklyShift', weeklyShift);

            weeklyShift.IsReleased = true;
          });
          Swal('Hooray!', 'Released Shiftweek Data Successfully. :)', 'success');
          // console.log('Released Shiftweek Data Successfully');
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal('Cancelled!', 'Request Cancelled. :(', 'error');
          // console.log('Cancel Request');
        }
      });
    } else {
      Swal('Cancelled!', 'No Data Found. :(', 'error');
      // console.log('Cancel Request -> No Data Found');
    }
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


  printDutyRoster(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printDutyRosterThisSection').innerHTML;
    // popupWin = window.open('', '_blank', 'scrollbars=1,resizable=1,top=0,left=0,height=600,width=800');
    popupWin = window.open('', 'windowOpenTab', 'scrollbars=1,resizable=1,top=0,left=0,height=600,width=800');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Duty Roster</title>
          <link rel="stylesheet" href="../../../../assets/dutyRoster/print.css">
          <style type="text/css" media="print">
          @page { size: landscape; max-height: 100%; max-width: 100%;}
          @media print  { zoom:75%;}
        </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }


  printDutyRosterDetail(): void {
    let printContents, popupWin;
    printContents = document.getElementById('printDutyRosterDetailSection').innerHTML;
    popupWin = window.open('', 'windowOpenTab', 'scrollbars=1,resizable=1,top=0,left=0,height=600,width=800');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Duty Roster</title>
          <link rel="stylesheet" href="../../../../assets/dutyRoster/print.css">
          <style type="text/css" media="print">
          @page { size: landscape; max-height: 100%; max-width: 100%;}
          @media print { zoom:75%;}
        </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

}
