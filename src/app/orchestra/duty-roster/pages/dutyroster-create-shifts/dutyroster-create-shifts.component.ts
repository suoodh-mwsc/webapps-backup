import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  TemplateRef
} from '@angular/core';
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
  selector: 'app-dutyroster-create-shifts',
  templateUrl: './dutyroster-create-shifts.component.html',
  styleUrls: ['./dutyroster-create-shifts.component.scss']
})
export class DutyrosterCreateShiftsComponent implements OnInit {
  
  topButtons: any;

  // Shift Groups ================================================
  shiftGroupShowLoader: boolean; // UI related
  shiftGroups: any = []; // DataArray
  shiftGroupsPaginationInfo: any; // DataArrayPagination
  shiftGroupsPaginationLocal: any; // DataArrayPagination
  selectedShiftGroup: any;
  selectedShiftGroupId: any;
  shiftEmployees: any = [];
  // =============================================================

  // =============================================================
  week: any;
  weekDetails: any;
  weekDetailsCancelled: any;
  shiftEmployeesDetails: any; // Cancelled Shift data
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

  constructor(
    private dutyRosterBase: DutyRosterBaseService,
    private yoda: YodaService
  ) {
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
      { date: sat, normalShifts: [], offShifts: [] }
    ];

    this.weekDetailsCancelled = [
      { date: sun, normalShifts: [], offShifts: [] },
      { date: mon, normalShifts: [], offShifts: [] },
      { date: tue, normalShifts: [], offShifts: [] },
      { date: wed, normalShifts: [], offShifts: [] },
      { date: thu, normalShifts: [], offShifts: [] },
      { date: fri, normalShifts: [], offShifts: [] },
      { date: sat, normalShifts: [], offShifts: [] }
    ];

    // tslint:disable-next-line:max-line-length
    this.monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    this.editMode = true;
    this.selectedStaff = null;
    this.shiftGroupsPaginationLocal = [];
    this.shiftGroupsPaginationInfo = [];
    this.selectedShiftGroupId = null;

    this.getAllShiftGroups(4, 1);
    this.getTopButtonDetails();
  }

  ngOnInit() { }

  displayShiftGroup(eventArgs) {
    console.log('displayShiftGroup -> eventArgs', eventArgs);
    this.dutyRosterBase.getShiftGroupById(eventArgs.Id).subscribe(data => {
      this.selectedShiftGroup = data;
      this.getWeekDetailsFromYoda(
        this.topButtons[1].weekNo,
        this.topButtons[1].year
      );
    });
  }

  // toggleshowCancelledHistory() {
  //   if (this.showCancelledHistory) {
  //     this.showCancelledHistory = false;
  //   } else {
  //     this.showCancelledHistory = true;
  //   }
  // }

  selectShiftGroup(shiftGroup) {
    this.selectedShiftGroup = null;
    this.selectedShiftGroupId = null;
    this.dutyRosterBase.getShiftGroupById(shiftGroup.Id).subscribe(
      data => {
        this.selectedShiftGroup = data;
        this.selectedShiftGroupId = data.Id;
        // console.log('selectShiftGroup selectedShiftGroup', this.selectedShiftGroup);
        this.getWeekDetailsFromYoda(
          this.topButtons[1].weekNo,
          this.topButtons[1].year
        );
      },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      }
    );
  }

  unSelectShiftGroup() {
    this.selectedShiftGroup = null;
    this.shiftGroupsWeeklyShift = null;
    this.weekDetails = null;
    this.weekDetailsCancelled = null;
    this.shiftEmployeesDetails = null;
    this.getAllShiftGroups(4, 1);
  }

  getAllShiftGroups(pageSize, pageNum) {
    this.shiftGroupShowLoader = true;
    this.shiftGroupsPaginationLocal.PageSize = pageSize;
    this.shiftGroupsPaginationLocal.PageNumber = pageNum;
    this.shiftGroups = [];
    this.dutyRosterBase
      .postShiftGroupsAssignedToSupervisor({
        PageSize: this.shiftGroupsPaginationLocal.PageSize,
        PageNumber: this.shiftGroupsPaginationLocal.PageNumber
      })
      .subscribe(
        data => {
          this.shiftGroupsPaginationInfo = data.PaginationInfo;
          data.Result.forEach(element => {
            this.shiftGroups.push(element);
          });
          console.log(
            'getAllShiftGroups - shiftGroups Data ->',
            this.shiftGroups
          );
          this.shiftGroupShowLoader = false;
        },
        (error: Response | any) => {
          this.shiftGroupShowLoader = false;
          return Observable.throw(new Error(error.status));
        }
      );
  }

  getTopButtonDetails() {
    return new Promise(resolve => {
      this.dutyRosterBase.getCurrentWeekDetails().subscribe(data => {
        this.setWeekDetailsInTopButton(0, data.WeekNo - 1, data.Year);
        this.setWeekDetailsInTopButton(1, data.WeekNo, data.Year);
        this.setWeekDetailsInTopButton(2, data.WeekNo + 1, data.Year);
        this.setWeekDetailsInTopButton(3, data.WeekNo + 2, data.Year);
        resolve();
      });
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
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === sun.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === sun.getDate() && e.IsOff === true
        )
      },
      {
        date: mon,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === mon.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === mon.getDate() && e.IsOff === true
        )
      },
      {
        date: tue,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === tue.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === tue.getDate() && e.IsOff === true
        )
      },
      {
        date: wed,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === wed.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === wed.getDate() && e.IsOff === true
        )
      },
      {
        date: thu,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === thu.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === thu.getDate() && e.IsOff === true
        )
      },
      {
        date: fri,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === fri.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === fri.getDate() && e.IsOff === true
        )
      },
      {
        date: sat,
        normalShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === sat.getDate() && e.IsOff === false
        ),
        offShifts: this.shiftGroupsWeeklyShift.Shifts.filter(
          e => new Date(e.StartsOn).getDate() === sat.getDate() && e.IsOff === true
        )
      }
    ];
    // this.summarizeDutyDetails();
  }

  getWeekDetailsFromYoda(weekNo, year) {
    this.selectedWeekNo = weekNo;
    if (this.selectedShiftGroup !== null && weekNo !== null && year !== null) {
      this.dutyRosterBase.getShiftGroupsByShiftGroupId(this.selectedShiftGroup.Id, weekNo, year)
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
