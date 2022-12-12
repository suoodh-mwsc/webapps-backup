import { Component, OnInit, Input, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { DutyRosterBaseService } from '../../services/duty-roster-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { YodaService } from '../../../../../../services/yoda.service';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';

declare var Swal: any;

@Component({
  selector: 'app-dutyroster-hr-dashboard',
  templateUrl: './dutyroster-hr-dashboard.component.html',
  styleUrls: ['./dutyroster-hr-dashboard.component.scss']
})
export class DutyrosterHrDashboardComponent implements OnInit {

// =============================================================
  // UI Realted
  showShiftGroupLoader: boolean;
  showShiftEmployeeLoader: boolean;
  showShiftSupervisorLoader: boolean;
  showWeeklyShiftLoader: boolean;
  showShiftTemplateLoader: boolean;

  showShiftGroupWeeklyShiftLoader: boolean;
  // =============================================================

  shiftGroups: any = [];
  // shiftGroup: any;
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
  updateWeeklyShift: any = [];
  // weeklyShiftId: any;
  weeklyShiftsPaginationInfo: any;
  weeklyShiftPendingHRRelease: any;
  weeklyShiftRelease: any;
  yearList: any = [];
  todayDate: any;
  // =============================================================
  shiftGroupWeeklyShiftData
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
  selectedYear: any;
  // =============================================================
  shiftTemplates: any = [];
  // allShiftTemplates: any = [];
  // =============================================================
  // Tables Load Model from row
  selectedRow: Number;
  setClickedRow: Function;
  // =============================================================
  selectedTab: any;
  selectedWeeklyShifts: any = null;
  // =============================================================
  // =============================================================
  // UI Realted
  showCreateShiftLoader: boolean;
  // =============================================================
  // Selecting assigned ShiftGroups of Supervisor
  assignedShiftGroups: any;
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
  thisYear: any;
  thisWeekNum: any;
  monthNames: any;
  editMode: boolean; // ShiftAssign Edit Mode Check
  selectedStaff: any;

  showCancelledHistory: boolean;

  selectedWeekNo: any;
  // =============================================================
  // =============================================================

  // @ViewChild('updateWeeklyShiftsModal') public updateWeeklyShiftsModal: ModalDirective;
  @Input() weeklyShiftId: any;
  @ViewChild('updateWeeklyShiftsModal') public updateWeeklyShiftsModal: ModalDirective;
  @ViewChild('updateShiftsTemplateModal') public updateShiftsTemplateModal: ModalDirective;
  // =============================================================
  @ViewChild('shiftAddModel') public shiftAddModel: ModalDirective;


  constructor(
    private dutyRosterBase: DutyRosterBaseService,
    private yoda: YodaService
  ) {
    this.weeklyShifts = [];
    this.shiftGroups = [];
    this.shiftGroupsPaginationInfo = [];
    this.weeklyShiftsPaginationInfo = [];
    this.selectedShiftGroupId = null;
    this.selectedTab = 'shiftSupervisors';
    this.getTodayDate();
    // =============================================================
    this.showShiftGroupWeeklyShiftLoader = false;

    this.todayDate = moment().toISOString();
    this.thisYear = moment().format('YYYY');
    this.thisWeekNum = moment(this.todayDate).week();

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
    this.assignedShiftGroups = [];
    this.shiftGroupsPaginationInfo = [];
    this.selectedShiftGroupId = null;

    // console.log('showThisWeekDutyRoster shiftGroupWeeklyShiftData', this.shiftGroupWeeklyShiftData);
    // this.getWeekDetailsFromYoda(this.shiftGroupWeeklyShiftData);
  }

  ngOnInit() {
    this.getAllShiftGroups(50, 1);
    this.getYears();
  }

  // =============================================================
  // DutyRoster API Functions
  // =============================================================
  addNewShiftGroups() {
    this.dutyRosterBase.postShiftGroupsNew(
      {
        'Name': this.newShiftGroup.Name,
        'Description': this.newShiftGroup.Description
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shift Group', 1000);
      console.log('Hooray!', 'You have added a new Shift Group');
      this.newShiftGroup.Name = null;
      this.newShiftGroup.Description = null;
      this.shiftGroups.push(value);
    });

  }

  selectShiftGroup(shiftGroup) {
    this.dutyRosterBase.getShiftGroupById(shiftGroup.Id).subscribe(data => {
      this.selectedShiftGroup = data;
      this.selectedShiftGroupId = data.Id;
      console.log('selectShiftGroup selectedShiftGroup', this.selectedShiftGroup);
    });
  }

  unSelectShiftGroup() {
    this.selectedShiftGroup = null;
    this.selectedShiftGroupId = null;
    this.shiftGroups = [];
    this.getAllShiftGroups(50, 1);
  }

  getAllShiftGroups(pageSize, pageNum) {
    this.showShiftGroupLoader = true;
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
      this.showShiftGroupLoader = false;
      console.log('getAllShiftGroups data', data);
      this.shiftGroupsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.shiftGroups.push(element);
      });
      console.log('getAllShiftGroups - shiftGroups Pagination ->', this.shiftGroupsPaginationInfo);
      console.log('getAllShiftGroups - shiftGroups Data ->', this.shiftGroups);
    }, (error: Response | any) => {
      this.showShiftGroupLoader = false;
      return Observable.throw(new Error(error.status));
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


  getShiftTemplatesAll() {
    this.showShiftTemplateLoader = true;
    this.dutyRosterBase.getShiftTemplatesAll().subscribe(data => {
      this.showShiftTemplateLoader = false;
      this.shiftTemplates = data;
      console.log('getShiftTemplatesAll - Data ->', this.shiftTemplates);
    }, (error: Response | any) => {
      this.showShiftTemplateLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }


  initializeWeeklyShiftsTab() {
    this.getShiftTemplatesAll();
    console.log('initializeWeeklyShiftsTab');
    this.selectedWeeklyShifts = null;
    this.getWeeklyShiftsYearList();
  }


  getWeeklyShiftsYearList() {
    this.dutyRosterBase.getWeeklyShiftYearsByShiftGroupId(this.selectedShiftGroup.Id).subscribe(data => {
      this.yearList = data;
      console.log('getWeeklyShiftsYearList - yearList Data ->', this.yearList);
    });
  }


  getWeeklyShiftsForYear(year) {
    this.selectedYear = year;
    this.dutyRosterBase.getWeeklyShiftsForYearsByShiftGroupId(this.selectedShiftGroup.Id, year).subscribe(data => {
      this.selectedWeeklyShifts = data;
      console.log('getWeeklyShiftsForYear - Data ->', this.selectedWeeklyShifts);
    });
  }


  addNewWeeklyShifts() {
    this.dutyRosterBase.postGenerateYearForWeeklyShift(
      {
        'Year': this.newWeeklyShift.Year,
        'ShiftGroup_Id': this.selectedShiftGroup.Id,
        'ShiftTemplate_Id': this.newWeeklyShift.ShiftTemplateId
      }
    ).subscribe(value => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Weekly Shift for Year', 1000);
      console.log('Hooray!', 'You have added a new Weekly Shift');
      this.newWeeklyShift.Year = null;
      this.newWeeklyShift.ShiftTemplateId = null;
      this.getWeeklyShiftsYearList();
    }, (error: Response | any) => {
      return Observable.throw(new Error(error.status));
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
    this.dutyRosterBase.getShiftGroupById(this.selectedShiftGroupId).subscribe(data => {
      // this.shiftGroup = data;
      this.selectShiftGroup = data;
    });
  }


  addNewShiftEmployee() {
    this.dutyRosterBase.postShiftEmployeeNew(
      {
        'EmployeeId': this.newShiftEmployees.EmployeeId,
        'ShiftGroup_Id': this.selectedShiftGroup.Id
      }
    ).subscribe((data) => {
      console.log('addNewShiftEmployee', data);
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have added a new Shifts Employee', 1000);
      this.newShiftEmployees.EmployeeId = null;
      this.newShiftEmployees.ShiftGroup_Id = null;
      this.selectedShiftGroup.ShiftEmployees.push(data);
    }, (error: Response | any) => {
      return Observable.throw(new Error(error.status));
    });
  }


  deleteShiftEmployees(shiftEmployee) {
    this.dutyRosterBase.deleteShiftEmployeesById(shiftEmployee.Id).subscribe(data => {
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have Deleted ShiftEmployees  Successfully', 1000);
      shiftEmployee.IsRemoved = data.IsRemoved;
    });
  }


  restoreShiftEmployees(shiftEmployee) {
    this.dutyRosterBase.restoreShiftEmployeesById(shiftEmployee.Id).subscribe(data => {
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
    }, (error: Response | any) => {
      return Observable.throw(new Error(error.status));
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
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftGroups();
    }
  }

  onKeydownAddWeeklyShift(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.addNewWeeklyShifts();
    }
  }

  onKeydownAddShiftsSupervisor(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftsSupervisor();
    }
  }

  onKeydownAddShiftEmployee(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.addNewShiftEmployee();
    }
  }

  selectActive(activeTab) {
    this.selectedTab = activeTab;
    console.log('selectActive', activeTab);
    console.log('selectActive', this.selectedTab);

    if (activeTab === 'weeklyShifts') {
      this.selectedTab = 'weeklyShifts';
    }

    if (activeTab === 'shiftSupervisors') {
      this.selectedTab = 'shiftSupervisors';
    }

    if (activeTab === 'shiftEmployees') {
      this.selectedTab = 'shiftEmployees';
    }
  }



  getWeeklyShiftExtend(updateWeeklyShift) {
    var extendDate = new Date(this.updateWeeklyShift.EditingPossibleUpto);
    var todayDate = new Date(this.todayDate);
    this.dutyRosterBase.postWeeklyShiftExtend(
      {
        'WeeklyShift_Id': this.weeklyShiftId,
        'EditingPossibleUpto': updateWeeklyShift.EditingPossibleUpto
      }
    ).subscribe(value => {
      this.selectedWeeklyShifts.forEach(element => {
        if (element.Id === this.weeklyShiftId) {
          element.EditingPossibleUpto = updateWeeklyShift.EditingPossibleUpto;
          if (extendDate < todayDate) {
            element.IsEditingPossible = false;
          } else {
            element.IsEditingPossible = true;
          }

        }
      });
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have extended Editing Period Successfully', 2000);
    });
  }


  showUpdateShiftAssignModal(weeklyShift) {
    this.updateWeeklyShiftsModal.show();
    this.weeklyShiftId = weeklyShift.Id;
  }



  getWeeklyShiftUpdateTemplate(updateWeeklyShift) {
    // var newTemplate = this.updateWeeklyShift.ShiftTemplate_Id;
    // var currentTemplate = updateWeeklyShift.ShiftTemplateId;
    this.dutyRosterBase.getWeeklyShiftUpdateShiftTemplate(
      {
        'WeeklyShift_Id': this.weeklyShiftId,
        'ShiftTemplate_Id': updateWeeklyShift.ShiftTemplateId
      }
    ).subscribe(value => {
      this.selectedWeeklyShifts.forEach(element => {
        if (element.Id === this.weeklyShiftId) {
          element.ShiftTemplate.Id = updateWeeklyShift.ShiftTemplateId;
          element.ShiftTemplate_Id = updateWeeklyShift.ShiftTemplateId;
          this.shiftTemplates.forEach(ele => {
            if (ele.Id === updateWeeklyShift.ShiftTemplateId) {
              element.ShiftTemplate.Name = ele.Name;
            }
          });
        }
      });
      this.dutyRosterBase.showCreateNewMsgBox('Hooray!', 'You have updated Shift Template Successfully', 2000);
    });
  }


  showShiftTemplateModal(weeklyShift) {
    this.updateShiftsTemplateModal.show();
    this.weeklyShiftId = weeklyShift.Id;
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
    }
  }


  getTodayDate() {
    this.todayDate = moment().toString();
  }


  // ----------------------------------------------------------------------------------------------------------

  showThisWeekDutyRoster(ShiftGroupId, WeekNumber, Year) {
    this.showShiftGroupWeeklyShiftLoader = true;
    console.log('showThisWeekDutyRoster showShiftGroupWeeklyShiftLoader', this.showShiftGroupWeeklyShiftLoader);
    var selectedShiftGroupId = ShiftGroupId;
    var selectedWeekNumber = WeekNumber;
    var selectedYear = Year;

    console.log('showThisWeekDutyRoster selectedShiftGroupId', selectedShiftGroupId);
    console.log('showThisWeekDutyRoster selectedWeekNumber', selectedWeekNumber);
    console.log('showThisWeekDutyRoster selectedYear', selectedYear);

    if (ShiftGroupId !== null && WeekNumber !== null && Year !== null) {
      this.dutyRosterBase.getShiftGroupsByShiftGroupId(ShiftGroupId, WeekNumber, Year)
        .subscribe(weeklyShiftData => {
          this.shiftGroupWeeklyShiftData = weeklyShiftData;
          this.selectedWeeklyShift = weeklyShiftData.Id;
          this.shiftGroupsWeeklyShift = weeklyShiftData;
          weeklyShiftData.ShiftTemplate.Times.forEach(ele => {
            this.selectedShiftGroupShiftTemplateTimes.push(ele);
          });
          console.log('getWeekDetailsFromYoda -> weekDetails', this.weekDetails);
          console.log('getWeekDetailsFromYoda -> shiftGroupData', weeklyShiftData);
          this.shiftEmployeesDetails = weeklyShiftData.ShiftGroup.ShiftEmployees;

          this.getWeekDetails();
          this.showShiftGroupWeeklyShiftLoader = false;
        }, (error: Response | any) => {
          this.showShiftGroupWeeklyShiftLoader = false;
          console.log('showThisWeekDutyRoster showShiftGroupWeeklyShiftLoader', this.showShiftGroupWeeklyShiftLoader);
          return Observable.throw(new Error(error.status));
        });
    }
  }


  unSelectWeekDutyRoster() {
    // this.selectedShiftGroup = null;
    this.getWeeklyShiftsForYear(this.selectedYear);
    this.selectActive('weeklyShifts');
    this.weekDetails = null;
    this.weekDetailsCancelled = null;
    this.shiftEmployeesDetails = null;

    this.shiftGroupWeeklyShiftData = null;
    this.shiftGroupsWeeklyShift = null;
    this.selectedWeeklyShift = null;
  }

  toggleshowCancelledHistory() {
    if (this.showCancelledHistory) {
      this.showCancelledHistory = false;
    } else {
      this.showCancelledHistory = true;
    }
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
    console.log('showShiftAssignModal :::>>');
    console.log('ShiftAssign :::>> shiftAddModalUnassignedEmployees', this.shiftAddModalUnassignedEmployees);
    console.log('ShiftAssign :::>> shiftAddModalAssignedEmployees', this.shiftAddModalAssignedEmployees);
    console.log('ShiftAssign :::>> shiftGroupsWeeklyShift.Shifts', this.shiftGroupsWeeklyShift.Shifts);
    // console.log('ShiftAssign :::>> assignShiftSelectedShift.normalShifts', this.assignShiftSelectedShift.normalShifts);
    // console.log('ShiftAssign :::>> assignShiftSelectedShift.offShifts', this.assignShiftSelectedShift.offShifts);
    console.log('ShiftAssign :::>> assignShiftSelectedShift', this.assignShiftSelectedShift);

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
      this.newShift(selectedStaff);
    }
  }


  newShift(selectedStaff) {
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

      console.log('newShift :::>>');
      console.log('newShift :::>> shiftAddModalUnassignedEmployees', this.shiftAddModalUnassignedEmployees);
      console.log('newShift :::>> shiftAddModalAssignedEmployees', this.shiftAddModalAssignedEmployees);
      console.log('newShift :::>> shiftGroupsWeeklyShift.Shifts', this.shiftGroupsWeeklyShift.Shifts);
      console.log('newShift :::>> assignShiftSelectedShift', this.assignShiftSelectedShift);


      this.getWeekDetails();
    });
  }


  showOffShiftAssignModal(selectedShift, selectedShiftsDate, selectedShiftStartTime, selectedShiftEndTime, isOff) {
    console.log('showOffShiftAssignModal :::>>');
    console.log('OffShiftAssign :::>> shiftAddModalUnassignedEmployees', this.shiftAddModalUnassignedEmployees);
    console.log('OffShiftAssign :::>> shiftAddModalAssignedEmployees', this.shiftAddModalAssignedEmployees);
    console.log('OffShiftAssign :::>> shiftGroupsWeeklyShift.Shifts', this.shiftGroupsWeeklyShift.Shifts);
    // console.log('OffShiftAssign :::>> assignShiftSelectedShift.normalShifts', this.assignShiftSelectedShift.normalShifts);
    // console.log('OffShiftAssign :::>> assignShiftSelectedShift.offShifts', this.assignShiftSelectedShift.offShifts);
    console.log('ShiftAssign :::>> assignShiftSelectedShift', this.assignShiftSelectedShift);

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

      //SHOW ONLY SELECTED STAFF OR ALL EMPLOYEES WITHIN GROUP FIRST
      if (this.selectedStaff) {
        if (this.selectedStaff.IsRemoved === false) {
          this.shiftAddModalUnassignedEmployees.push(this.selectedStaff);
        }
      } else {
        this.shiftGroupsWeeklyShift.ShiftGroup.ShiftEmployees.forEach(element => {
          if (element.IsRemoved === false) {
            this.shiftAddModalUnassignedEmployees.push(element);
          }
        });
      }

      this.shiftAddModalAssignedEmployees = [];
      selectedShift.offShifts.forEach(element => {
        if (!element.CancelledOn) {
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
        }
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
      this.shiftGroupsWeeklyShift.Shifts.push(value);
      ///////////////// Changes
      // this.assignShiftSelectedShift.normalShifts.push(value);
      this.assignShiftSelectedShift.offShifts.push(value);
      this.shiftAddModalAssignedEmployees.push(value);
      this.shiftAddModalUnassignedEmployees.forEach(shiftUnassignedEmployee => {
        if (shiftUnassignedEmployee.Id === selectedStaff.Id) {
          var removeIndex = this.shiftAddModalUnassignedEmployees.indexOf(shiftUnassignedEmployee);
          this.shiftAddModalUnassignedEmployees.splice(removeIndex, 1);
        }
      });

      console.log('newOff :::>>');
      console.log('newOff :::>> shiftAddModalUnassignedEmployees', this.shiftAddModalUnassignedEmployees);
      console.log('newOff :::>> shiftAddModalAssignedEmployees', this.shiftAddModalAssignedEmployees);
      console.log('newOff :::>> shiftGroupsWeeklyShift.Shifts', this.shiftGroupsWeeklyShift.Shifts);
      console.log('newOff :::>> assignShiftSelectedShift', this.assignShiftSelectedShift);

      this.getWeekDetails();

    }, (error: Response | any) => {
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

      console.log('unAssignStafftoShift :::>>');
      console.log('unAssignShift :::>> shiftAddModalUnassignedEmployees', this.shiftAddModalUnassignedEmployees);
      console.log('unAssignShift :::>> shiftAddModalAssignedEmployees', this.shiftAddModalAssignedEmployees);

      console.log('unAssignShift :::>> shiftGroupsWeeklyShift.Shifts', this.shiftGroupsWeeklyShift.Shifts);
      console.log('unAssignShift :::>> assignShiftSelectedShift.normalShifts', this.assignShiftSelectedShift.normalShifts);
      console.log('unAssignShift :::>> assignShiftSelectedShift.offShifts', this.assignShiftSelectedShift.offShifts);

      this.getWeekDetails();
    }, (error: Response | any) => {
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



  getWeekDetailsFromYoda(weeklyShiftData) {
    console.log('getWeekDetailsFromYoda shiftGroupData', weeklyShiftData);

    this.selectedWeeklyShift = weeklyShiftData.Id;
    this.shiftGroupsWeeklyShift = weeklyShiftData;

    weeklyShiftData.ShiftTemplate.Times.forEach(ele => {
      this.selectedShiftGroupShiftTemplateTimes.push(ele);
    });

    console.log('getWeekDetailsFromYoda -> weekDetails', this.weekDetails);
    console.log('getWeekDetailsFromYoda -> shiftGroupData', weeklyShiftData);
    this.shiftEmployeesDetails = weeklyShiftData.ShiftGroup.ShiftEmployees;

    this.getWeekDetails();
  }


  zgetWeekDetailsFromYoda(weekNo, year) {
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
