import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NfcGuardPatrolBaseService } from './../../shared/services/nfc-guard-patrol-base.service';
import { GlobalService } from './../../../../services/global.service';
import { ModalDirective } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-nfc-guard-patrol-supervisor-routes-assign',
  templateUrl: './nfc-guard-patrol-supervisor-routes-assign.component.html',
  styleUrls: ['./nfc-guard-patrol-supervisor-routes-assign.component.scss']
})
export class NfcGuardPatrolSupervisorRoutesAssignComponent implements OnInit {

  showLoader: boolean;
  viewAsTile: boolean;
  // =============================================================
  // UI Related
  selectedTab: any;

  // selectedPatrollingRoute: any;
  // selectedPatrollingTag: any;
  // selectedSecurityTask: any;
  // =============================================================
  // Security Group
  newGroup: any = [];       // Create
  groups: any = [];         // View
  groupsPaginationInfo: any;
  selectedPatrollingGroup: any;
  // =============================================================
  // Security Employee
  // guards: any;
  // employee: any = [];
  // employeeData: any = [];
  // employeeDetails: any;
  // employeePictureBase64: any;
  // roles: any = [];
  // newEmployee: any = [];
  // =============================================================
  // Security Supervisor
  // newSupervisor: any = [];
  // =============================================================
  // Security Routes
  // routes: any = [];
  // routeId: any = [];
  // =============================================================
  // Security Tags
  // tags: any = [];
  // tagId: any = [];
  // =============================================================
  // Security Task
  // tasks: any = [];
  // taskId: any = [];
  // =============================================================
  // Assign Security Route
  showPendingList: boolean;
  selectedRouteList: any = [];

  newRouteAssign: any = [];

  newSingleRouteAssign: any = [];
  newEmployee1Id: any;
  newPatrollingRouteId: any;

  newBulkRouteAssign: any = [];
  newEmployee2Id: any;

  allPendingAssignedRoutes: any = [];
  pendingAssignedRoutesPaginationInfo: any = [];
  pendingAssignedRoutes: any = [];
  pendingAssignedRoutesTemp: any = [];


  assignedRouteDetails: any = {};

  startDate: any;
  toDate: any;

  todayDate: any;

  // Export Data
  nowDateTime: any; // Rename Export Data
  downloadDataReport: any = [];

  // Add GET-All Routes DataToDropdown
  // routesData: any = [];      // Dropdown Data
  // tagsData: any = [];        // Dropdown Data
  // tasksData = [];            // Dropdown Data
  // tasklist = [];
  // incidentlist = [];

  // closeResult: string;
  // headMessage: string;

  // Assign Security Route
  @ViewChild('showAssignRouteDetailsModal') public showAssignRouteDetailsModal: ModalDirective;
  @ViewChild('showAssignSingleRouteModal') public showAssignSingleRouteModal: ModalDirective;
  @ViewChild('showAssignBulkRouteModal') public showAssignBulkRouteModal: ModalDirective;

  constructor(
    private nfcGuardPatrolBase: NfcGuardPatrolBaseService,
    public global: GlobalService,
    private sanitizer: DomSanitizer
  ) {
    this.assignedRouteDetails = [];
    this.postSecurityGroupAll(10, 1);
    this.viewAsTile = true;

    this.todayDate = moment().toISOString();
    if (this.todayDate !== null) {
      this.startDate = moment(this.todayDate).local().format();
      this.toDate = moment(this.todayDate).add(1, 'days').local().format();
      // this.startDate = new Date();
      // this.toDate = new Date();
      // this.startDate.setDate(this.todayDate - 7);
      // this.toDate.setDate(this.todayDate + 7);
      console.log('Date -> this.startDate ', this.startDate);
      console.log('Date -> this.toDate ', this.toDate);
      if (this.startDate !== null && this.toDate !== null) {
        // this.getPendingAssignedRoutes(5, 1);
      }
    }
  }



  ngOnInit() {
  }



  // UI  ============================================================
  changeViewAsTile() {
    console.log('Tile');
    this.viewAsTile = true;
  }

  changeViewAsTable() {
    console.log('Table');
    this.viewAsTile = false;
  }



  // Security Group  ============================================================
  postSecurityGroupAll(pageSize, pageNum) {
    this.showLoader = true;
    let groupShowDeleted = true;
    let groupPageSize = pageSize;
    let groupPageNumber = pageNum;
    // this.nfcGuardPatrolBase.postPatrollingGroupAll(
    this.nfcGuardPatrolBase.postPatrollingGroupAssignedToSupervisor(
      {
        // 'ShowDeleted': groupShowDeleted,
        'PageSize': groupPageSize,
        'PageNumber': groupPageNumber
      }
    ).subscribe((data: any) => {
      // console.log('postSecurityGroupAll data', data);
      this.showLoader = false;
      this.groupsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.groups.push(element);
      });
      // console.log('postSecurityGroupAll - groups Pagination ->', this.groupsPaginationInfo);
      console.log('postSecurityGroupAll - groups Data ->', this.groups);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }



  postSecurityGroupOfSupervisor(pageSize, pageNum) {
    this.showLoader = true;
    let groupShowDeleted = true;
    let groupPageSize = pageSize;
    let groupPageNumber = pageNum;
    this.nfcGuardPatrolBase.postPatrollingGroupAssignedToSupervisor(
      {
        // 'ShowDeleted': groupShowDeleted,
        'PageSize': groupPageSize,
        'PageNumber': groupPageNumber
      }
    ).subscribe((data: any) => {
      // console.log('postSecurityGroupAll data', data);
      this.showLoader = false;
      this.groupsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.groups.push(element);
      });
      // console.log('postSecurityGroupAll - groups Pagination ->', this.groupsPaginationInfo);
      console.log('postSecurityGroupAll - groups Data ->', this.groups);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }



  selectSecurityGroup(group) {
    this.viewAsTile = false;
    this.selectedPatrollingGroup = group;
    console.log('selectSecurityGroup route', this.selectedPatrollingGroup);
    this.nfcGuardPatrolBase.getPatrollingGroupById(group.Id).subscribe(data => {
      console.log('selectSecurityGroup data', data);
      this.selectedPatrollingGroup = data;
    });

    if (this.startDate !== null && this.toDate !== null) {
      this.getPendingAssignedRoutesSearch(5, 1);
    }
  }



  unSelectSecurityGroup() {
    this.viewAsTile = true;
    this.selectedPatrollingGroup = null;
    // this.selectedPatrollingRoute = null;
    // this.selectedPatrollingTag = null;
    // this.selectedSecurityTask = null;
    this.pendingAssignedRoutes = [];
  }




  // Assign Route =============================================================
  getPendingAssignedRoutes(pageSize, pageNum) {
    this.showLoader = true;
    this.allPendingAssignedRoutes.ShowDeleted = true;
    this.allPendingAssignedRoutes.PageSize = pageSize;
    this.allPendingAssignedRoutes.PageNumber = pageNum;
    this.pendingAssignedRoutesTemp = [];
    this.nfcGuardPatrolBase.postPatrollingRouteAssignFilterByDates(
      {
        'From': this.startDate,
        'To': this.toDate,
        'PageSize': this.allPendingAssignedRoutes.PageSize,
        'PageNumber': this.allPendingAssignedRoutes.PageNumber,
        'PatrollingGroup_Id': this.selectedPatrollingGroup.Id
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getPendingAssignedRoutes data', data);
      this.pendingAssignedRoutesPaginationInfo = data.PaginationInfo;
      data.PatrollingRoutesAssigned.forEach(element => {
        this.pendingAssignedRoutes.push(element);
      });
      // console.log('getPendingAssignedRoutes - assignedRoutes Pagination ->', this.pendingAssignedRoutesPaginationInfo);
      // console.log('getPendingAssignedRoutes - pendingAssignedRoutes Data ->', this.pendingAssignedRoutes);
      this.pendingAssignedRoutes.forEach(elemt => {
        // tslint:disable-next-line:max-line-length
        var assignedfromDate = moment(elemt.From).format('DD.MM.YYYY');
        var assignedtoDate = moment(elemt.To).format('DD.MM.YYYY');
        if (elemt.PatrollingTagsAssigned.length > 0) {
          elemt.PatrollingTagsAssigned.forEach(eleTag => {
            if (eleTag.PatrollingTaskAssigned.length > 0) {
              eleTag.PatrollingTaskAssigned.forEach(eleTask => {
                const dataExport = {
                  // RouteId: elemt.PatrollingRoute.Id,                    // Routes
                  RouteName: elemt.PatrollingRoute.Name,
                  // TagId: eleTag.PatrollingTags.Id,                      // Tag
                  TagName: eleTag.PatrollingTags.Name,
                  TagDescription: eleTag.PatrollingTags.Description,
                  // TaskId: eleTask.PatrollingTask.Id,                    // Task
                  TaskName: eleTask.PatrollingTask.Name,
                  TaskTypeDescription: eleTask.PatrollingTask.PatrollingTaskTypeDescription,
                  From: assignedfromDate,                                 // Assigned
                  To: assignedtoDate,
                  AssignedTo: elemt.AssignedTo_Id,
                  Status: elemt.Status,
                };
                this.downloadDataReport.push(dataExport);
                // console.log('export data - elemt ->', elemt.PatrollingRoute.Name);
                // console.log('export data - eleTag ->', eleTag.PatrollingTags.Name);
                // console.log('export data - eleTask ->', eleTask.PatrollingTask.Name);
                // console.log('export data - eleTask ->', this.downloadDataReport);
              });
            }
          });
        }
      });
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }



  getPendingAssignedRoutesSearch(pageSize, pageNum) {
    this.pendingAssignedRoutes = [];
    this.showLoader = true;
    this.allPendingAssignedRoutes.ShowDeleted = true;
    this.allPendingAssignedRoutes.PageSize = pageSize;
    this.allPendingAssignedRoutes.PageNumber = pageNum;
    this.pendingAssignedRoutesTemp = [];
    this.nfcGuardPatrolBase.postPatrollingRouteAssignFilterByDates(
      {
        'From': this.startDate,
        'To': this.toDate,
        'PageSize': this.allPendingAssignedRoutes.PageSize,
        'PageNumber': this.allPendingAssignedRoutes.PageNumber,
        'PatrollingGroup_Id': this.selectedPatrollingGroup.Id
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getPendingAssignedRoutes data', data);
      this.pendingAssignedRoutesPaginationInfo = data.PaginationInfo;
      data.PatrollingRoutesAssigned.forEach(element => {
        this.pendingAssignedRoutes.push(element);
      });
      // console.log('getPendingAssignedRoutes - assignedRoutes Pagination ->', this.pendingAssignedRoutesPaginationInfo);
      // console.log('getPendingAssignedRoutes - pendingAssignedRoutes Data ->', this.pendingAssignedRoutes);
      this.pendingAssignedRoutes.forEach(elemt => {
        // tslint:disable-next-line:max-line-length
        var assignedfromDate = moment(elemt.From).format('DD.MM.YYYY');
        var assignedtoDate = moment(elemt.To).format('DD.MM.YYYY');
        if (elemt.PatrollingTagsAssigned.length > 0) {
          elemt.PatrollingTagsAssigned.forEach(eleTag => {
            if (eleTag.PatrollingTaskAssigned.length > 0) {
              eleTag.PatrollingTaskAssigned.forEach(eleTask => {
                const dataExport = {
                  // RouteId: elemt.PatrollingRoute.Id,                    // Routes
                  RouteName: elemt.PatrollingRoute.Name,
                  // TagId: eleTag.PatrollingTags.Id,                      // Tag
                  TagName: eleTag.PatrollingTags.Name,
                  TagDescription: eleTag.PatrollingTags.Description,
                  // TaskId: eleTask.PatrollingTask.Id,                    // Task
                  TaskName: eleTask.PatrollingTask.Name,
                  TaskTypeDescription: eleTask.PatrollingTask.PatrollingTaskTypeDescription,
                  From: assignedfromDate,                              // Assigned
                  To: assignedtoDate,
                  AssignedTo: elemt.AssignedTo_Id,
                  Status: elemt.Status,
                };
                this.downloadDataReport.push(dataExport);
                // console.log('export data - elemt ->', elemt.PatrollingRoute.Name);
                // console.log('export data - eleTag ->', eleTag.PatrollingTags.Name);
                // console.log('export data - eleTask ->', eleTask.PatrollingTask.Name);
                // console.log('export data - eleTask ->', this.downloadDataReport);
              });
            }
          });
        }
      });
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }



  viewPendingAssignedRoutesList() {
    if (this.pendingAssignedRoutes.length < 1) {
      this.pendingAssignedRoutes = [];
      this.getPendingAssignedRoutes(10, 1);
    } else {
      this.pendingAssignedRoutes = [];
      this.getPendingAssignedRoutes(10, 1);
    }
    this.showPendingList = true;
  }



  showAssignRoute(pendingAssignedRoutes) {
    this.assignedRouteDetails = [];
    console.log('showAssignRoute -> pendingAssignedRoutes', pendingAssignedRoutes);
    this.assignedRouteDetails = pendingAssignedRoutes;
    console.log('showAssignRoute -> assignedRouteDetails', this.assignedRouteDetails);
    this.showAssignRouteDetailsModal.show();
  }


  showAssignSingleRoute(from, to) {
    console.log('showAssignSingleRoute -> selectSecurityGroup', this.selectedPatrollingGroup);
    this.selectedRouteList = [];
    this.showAssignSingleRouteModal.show();

    if (this.newSingleRouteAssign.PatrollingRoute_Id = null) {
      this.newSingleRouteAssign.PatrollingRoute_Id = this.newPatrollingRouteId;
    }

    if (this.newSingleRouteAssign.AssignedTo_Id = null) {
      this.newSingleRouteAssign.AssignedTo_Id = this.newEmployee1Id;
    }
  }




  showAssignBulkRoute(from, to) {
    console.log('showAssignBulkRoute -> selectSecurityGroup', this.selectedPatrollingGroup);
    this.selectedRouteList = [];
    this.showAssignBulkRouteModal.show();

    if (this.newBulkRouteAssign.AssignedTo_Id = null) {
      this.newBulkRouteAssign.AssignedTo_Id = this.newEmployee2Id;
    }
  }




  updateSelected(route, event: any) {
    if (event.target.checked) {
      // tslint:disable-next-line:no-unused-expression
      route.Selected = true;
      console.log('Checked', route);
      this.selectedRouteList.push(route.Id);
      console.log('selectedRouteList', this.selectedRouteList);
    } else {
      route.Selected = false;
      console.log('Un Check', route);

      for (var i = 0; i < this.selectedRouteList.length; i++) {
        if (this.selectedRouteList[i] === route.Id) {
          this.selectedRouteList.splice(i, 1);
        }
      }
      console.log('selectedRouteList', this.selectedRouteList);
    }
  }





  startDateReduction() {
    if (this.startDate) {
      // this.startDate = moment(this.startDate).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      this.startDate = moment(this.startDate).subtract(1, 'days').local().format();
    } else {
      this.startDate = this.todayDate;
    }

  }

  startDateIncrement() {
    // this.startDate = moment(this.startDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    this.startDate = moment(this.startDate).add(1, 'days').local().format();
  }

  toDateReduction() {
    // this.toDate = moment(this.toDate).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    this.toDate = moment(this.toDate).subtract(1, 'days').local().format();
  }

  toDateIncrement() {
    // this.toDate = moment(this.toDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
    this.toDate = moment(this.toDate).add(1, 'days').local().format();
  }



  assignRoute() {
    // this.newRouteAssign = [];
    this.newSingleRouteAssign.From = this.startDate;
    this.newSingleRouteAssign.To = this.toDate;
    // this.newSingleRouteAssign.PatrollingRoute_Id = this.newPatrollingRouteId;
    // this.newSingleRouteAssign.AssignedTo_Id = this.newEmployeeId;
    console.log('assignRoute -> newRouteAssign', this.newSingleRouteAssign);
    console.log('assignRoute -> employeeId', this.newSingleRouteAssign.Employee_Id);
    console.log('assignRoute -> Route_Id', this.newSingleRouteAssign.RouteId);
    this.nfcGuardPatrolBase.postPatrollingRouteAssign(
      {
        'PatrollingRoute_Id': this.newSingleRouteAssign.RouteId,
        'AssignedTo_Id': this.newSingleRouteAssign.Employee_Id,
        'From': this.newSingleRouteAssign.From,
        'To': this.newSingleRouteAssign.To
      }
    ).subscribe((data: any) => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have assigned Route Successfully', 1000);
      console.log('assignRoute data', data);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  assignRouteBulk() {
    // this.newRouteAssign = [];
    this.newBulkRouteAssign.From = this.startDate;
    this.newBulkRouteAssign.To = this.toDate;
    // this.newBulkRouteAssign.PatrollingRoute_Id = this.newPatrollingRouteId;
    // this.newBulkRouteAssign.AssignedTo_Id = this.newEmployeeId;
    console.log('assignRoute -> newRouteAssign', this.newBulkRouteAssign);
    console.log('assignRoute -> employeeId', this.newBulkRouteAssign.Employee_Id);
    console.log('assignRoute -> Route_Id', this.newBulkRouteAssign.RouteId);

    this.nfcGuardPatrolBase.postPatrollingRouteAssignBulk(
      {
        'PatrollingRoute': this.selectedRouteList,
        'AssignedTo_Id': this.newBulkRouteAssign.Employee_Id,
        'From': this.newBulkRouteAssign.From,
        'To': this.newBulkRouteAssign.To,
        'Status': 'Pending'
      }
    ).subscribe((data: any) => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have assigned Route Successfully', 1000);
      console.log('assignRouteBulk data', data);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }



  onChangeEmployee(event) {
    console.log('onChangeEmployee -> event', event);
    this.newEmployee1Id = '' + event;
    console.log('onChangeEmployee -> this.newEmployeeId', this.newEmployee1Id);
    this.newRouteAssign.AssignedTo_Id = this.newEmployee1Id;
  }



  onChangeEmployeeTwo(event) {
    console.log('onChangeEmployee -> event', event);
    this.newEmployee2Id = '' + event;
    console.log('onChangeEmployee -> this.newEmployeeId', this.newEmployee2Id);
    this.newRouteAssign.AssignedTo_Id = this.newEmployee2Id;
  }



  onChangeRoute(event) {
    console.log('onChangeEmployee -> event', event);
    this.newPatrollingRouteId = '' + event;
    console.log('onChangeEmployee -> this.newPatrollingRouteId', this.newPatrollingRouteId);
    this.newRouteAssign.PatrollingRoute_Id = this.newPatrollingRouteId;
  }




  download() {
    if (this.downloadDataReport.length > 0) {
      Swal({
        title: 'Export Assigned Route Data?',
        text: 'Do you want export Assigned Route Data?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        // closeOnConfirm: true,
        // closeOnCancel: true,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
          // tslint:disable-next-line:no-construct
          const reportTitle = new String('Assigend_Routes_Data_');
          const title = reportTitle.concat(this.nowDateTime);
          console.log('ReportTitleWithDate :', title);

          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'Assigned Routes Data ' + '\nCreated Date: ' + this.nowDateTime,
            // useBom: true,
            // noDownload: true,
            // headers: ['Route Id', 'Route Name', 'Tag Id', 'Tag Name', 'Tag Description', 'TaskId', 'Task Name', 'Task Type', 'From', 'To', 'Assigned To', 'Status']
            headers: ['Route Name', 'Tag Name', 'Tag Description', 'Task Name', 'Task Type', 'From', 'To', 'Assigned To', 'Status']
          };
          // tslint:disable-next-line:no-unused-expression
          new Angular5Csv(this.downloadDataReport, title, options);
          console.log('Upload Data', this.downloadDataReport);

          Swal('Hooray!', 'Export Data Successfully. :)', 'success');
          // console.log('Export DutyRoster Data Successfully');
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


}
