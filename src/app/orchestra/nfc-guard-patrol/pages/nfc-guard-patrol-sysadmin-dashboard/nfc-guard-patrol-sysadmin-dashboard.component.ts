import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NfcGuardPatrolBaseService } from './../../shared/services/nfc-guard-patrol-base.service';
import { GlobalService } from './../../../../services/global.service';
import { ModalDirective } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import * as moment from 'moment';
declare var Swal: any;

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-nfc-guard-patrol-sysadmin-dashboard',
  templateUrl: './nfc-guard-patrol-sysadmin-dashboard.component.html',
  styleUrls: ['./nfc-guard-patrol-sysadmin-dashboard.component.scss']
})
export class NfcGuardPatrolSysadminDashboardComponent implements OnInit {

  showLoader: boolean;
  viewAsTile: boolean;
  // =============================================================
  // UI Related
  selectedTab: any;

  selectedPatrollingRoute: any;
  selectedPatrollingTag: any;
  selectedPatrollingTask: any;
  // =============================================================
  // Security Group
  newGroup: any = [];       // Create
  groups: any = [];         // View
  groupsPaginationInfo: any;
  selectedPatrollingGroup: any;
  // =============================================================
  // Security Employee
  guards: any;
  employee: any = [];
  employeeData: any = [];
  employeeDetails: any;
  employeePictureBase64: any;
  roles: any = [];
  newEmployee: any = [];
  // =============================================================
  // Security Supervisor
  newSupervisor: any = [];
  // =============================================================
  // Security Routes
  routes: any = [];
  routeId: any = [];
  newRoute: any = [];
  myRoute: any = [];            // Update Function
  updateRouteName: any;         // Update Function
  updateRouteDescription: any;  // Update Function
  updateRouteIsActive: any;     // Update Function
  // =============================================================
  // Security Tags
  tags: any = [];
  tagId: any = [];
  newTag: any = [];
  myTag: any = [];
  updateTagName: any;         // Update Function
  updateTagDescription: any;  // Update Function
  updateTagIsActive: any;     // Update Function
  updateTagRoute_Id: any;     // Update Function
  // =============================================================
  // Security Task
  tasks: any = [];
  taskId: any = [];
  newTask: any = [];
  taskTypes: any = [];
  myTask: any = [];           // Update Function
  updateTaskName: any;        // Update Function
  updateTaskIsActive: any;    // Update Function
  updateTaskTag_Id: any;      // Update Function
  addTasks: any;          // Add Task Modal
  removeTasks: any;
  selectedTask: any;
  // =============================================================

  // // Tables Load Model from row
  // selectedRow: Number;
  // setClickedRow: Function;


  // Add GET-All Routes DataToDropdown
  routesData: any = [];      // Dropdown Data
  tagsData: any = [];        // Dropdown Data
  tasksData = [];            // Dropdown Data

  tasklist = [];
  incidentlist = [];



  //  Download
  nowDateTime: any; // Rename Export Data
  downloadDataReport: any = [];
  customRouteStatus: any;
  customTagStatus: any;
  customTaskStatus: any;

  closeResult: string;
  headMessage: string;

  @ViewChild('addGroupModal') public addGroupModal: ModalDirective;
  @ViewChild('addEmployeeModal') public addEmployeeModal: ModalDirective;
  @ViewChild('addSupervisorModal') public addSupervisorModal: ModalDirective;

  @ViewChild('addRouteModal') public addRouteModal: ModalDirective;
  @ViewChild('addTagModal') public addTagModal: ModalDirective;
  @ViewChild('addTaskModal') public addTaskModal: ModalDirective;

  @ViewChild('updateTaskTypeModal') public updateTaskTypeModal: ModalDirective;

  constructor(
    private nfcGuardPatrolBase: NfcGuardPatrolBaseService,
    public global: GlobalService,
    private sanitizer: DomSanitizer
  ) {
    this.postSecurityGroupAll(10, 1);
    this.viewAsTile = true;

    // this.selectedPatrollingGroup = [
    //   { Name: '', GroupRoutes: [], GroupSupervisors: [], GroupEmployees: [] },
    // ];
    // console.log('selectedPatrollingGroup', this.selectedPatrollingGroup);

    this.roles = [
      // { ID: '1001', Name: 'System Admin', IsActive: true },
      // { ID: '1002', Name: 'Security Supervisor', IsActive: true },
      { ID: '1003', Name: 'Security Guard', IsActive: true }
    ];

    this.taskTypes = [
      { Id: '0', Name: 'Scan Tag', IsActive: true },
      { Id: '1', Name: 'Choice', IsActive: true },
      { Id: '2', Name: 'Yes/No', IsActive: true },
      { Id: '3', Name: 'Text', IsActive: true },
      { Id: '4', Name: 'Number', IsActive: true },
    ];
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

  selectActive(activeTab) {
    this.selectedTab = activeTab;
    console.log('selectActive', activeTab);
    console.log('selectActive', this.selectedTab);

    if (activeTab === 'groupRoutes') {
      this.viewAsTile = true;
      this.selectedTab = 'groupRoutes';
      this.selectedPatrollingRoute = null;
      this.selectedPatrollingTag = null;
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];
    }

    if (activeTab === 'groupSupervisors') {
      this.viewAsTile = false;
      this.selectedTab = 'groupSupervisors';
      this.selectedPatrollingRoute = null;
      this.selectedPatrollingTag = null;
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];
    }

    if (activeTab === 'groupEmployees') {
      this.viewAsTile = false;
      this.selectedTab = 'groupEmployees';
      this.selectedPatrollingRoute = null;
      this.selectedPatrollingTag = null;
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];
    }
  }


  // Security Group  ============================================================
  addNewGroup() {
    this.nfcGuardPatrolBase.postPatrollingGroupNew(
      {
        'Name': this.newGroup.Name,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new group', 1000);
      this.newGroup.Name = null;
      this.groups.push(value);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  onKeydownAddGroup(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.addNewGroup();
    }
  }


  postSecurityGroupAll(pageSize, pageNum) {
    this.showLoader = true;
    let groupShowDeleted = true;
    let groupPageSize = pageSize;
    let groupPageNumber = pageNum;
    this.nfcGuardPatrolBase.postPatrollingGroupAll(
      {
        'ShowDeleted': groupShowDeleted,
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

  updateSecurityGroupRestore(group) {
    this.nfcGuardPatrolBase.getPatrollingGroupRestoreById(group.Id).subscribe(data => {
      group.IsDeleted = false;
      console.log('updateSecurityGroupRestore', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Group status as Active ', 1000);
    });
  }


  updateSecurityGroupDelete(group) {
    this.nfcGuardPatrolBase.getPatrollingGroupDeleteById(group.Id).subscribe(data => {
      group.IsDeleted = true;
      console.log('updateSecurityGroupDelete', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Group status as InActive ', 1000);
    });
  }


  selectSecurityGroup(group) {
    this.viewAsTile = false;
    this.selectedPatrollingGroup = group;
    console.log('selectSecurityGroup route', this.selectedPatrollingGroup);
    // this.nfcGuardPatrolBase.getPatrollingTagsByRouteId(group.Id).subscribe(data => {
    //   // this.tags = data;
    //   // console.log('selectSecurityGroup tags', this.tags);
    // });

    if (this.selectedPatrollingGroup.PatrollingSupervisors.length > 0) {
      this.selectedTab = 'groupSupervisors';
    } else if (this.selectedPatrollingGroup.PatrollingEmployees.length > 0) {
      this.selectedTab = 'groupEmployees';
    }

    // this.selectedPatrollingGroup.PatrollingRoutes = [];
    // if (this.selectedPatrollingGroup.PatrollingRoutes.length > 0) {
    //   this.getAllRoutes();
    // }


    this.downloadDataReport = [];

    this.selectedPatrollingGroup.PatrollingRoutes.forEach(elemt => {
      console.log('selectedPatrollingGroup.PatrollingRoutes elemt', elemt);
      // tslint:disable-next-line:max-line-length
      var assignedfromDate = moment(elemt.From).format('DD.MM.YYYY');
      var assignedtoDate = moment(elemt.To).format('DD.MM.YYYY');

      if (elemt.IsActive = true) {
        this.customRouteStatus = 'Active';
      } else if (elemt.IsActive = false) {
        this.customRouteStatus = 'Inactive';
      }

      if (elemt.PatrollingTags.length > 0) {
        elemt.PatrollingTags.forEach(eleTag => {
          console.log('PatrollingTag eleTag', eleTag);

          if (eleTag.IsActive = true) {
            this.customTagStatus = 'Active';
          } else if (eleTag.IsActive = false) {
            this.customTagStatus = 'Inactive';
          }

          if (eleTag.PatrollingTask.length > 0) {
            eleTag.PatrollingTask.forEach(eleTask => {
              console.log('PatrollingTag eleTask', eleTask);

              if (eleTag.IsActive = true) {
                this.customTaskStatus = 'Active';
              } else if (eleTag.IsActive = false) {
                this.customTaskStatus = 'Inactive';
              }

              const dataExport = {
                Group: this.selectedPatrollingGroup.Name,  // Group
                RouteId: elemt.Id,                    // Routes
                RouteName: elemt.Name,
                RouteDescription: elemt.Description,
                RouteStatus: this.customRouteStatus,
                TagId: eleTag.Id,                     // Tag
                TagName: eleTag.Name,
                TagDescription: eleTag.Description,
                TagStatus: this.customTagStatus,
                TaskId: eleTask.Id,                   //  Task
                TaskName: eleTask.Name,
                TaskTypeDescription: eleTask.PatrollingTaskTypeDescription,
                tagStatus: this.customTaskStatus,
              };
              this.downloadDataReport.push(dataExport);
            });
          }
        });
      }
    });

    console.log('downloadDataReport', this.downloadDataReport);
  }


  unSelectSecurityGroup() {
    this.viewAsTile = true;

    if (this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags
      && this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags > 1) {
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
      if (this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask
        && this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask > 1) {
        this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];
      }
    }

    this.selectedPatrollingGroup = null;
    this.selectedPatrollingRoute = null;
    this.selectedPatrollingTag = null;
    this.selectedPatrollingTask = null;

  }


  showAddGroupModal() {
    console.log('addGroupModal Data  ->', 'addGroupModal');
    this.addGroupModal.show();
  }


  // Security Supervisors ==========================================================
  addSupervisor() {
    console.log('addSupervisor data', this.newEmployee);
    var selectSecurityGroupId = this.selectedPatrollingGroup.Id;
    this.nfcGuardPatrolBase.postPatrollingSupervisorNew(
      {
        'EmployeeId': this.newSupervisor.EmployeeId,
        'PatrollingGroup_Id': selectSecurityGroupId,
      }
    ).subscribe((data: any) => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new Supervisor', 1000);
      console.log('addSupervisor data', data);

      if (this.selectedPatrollingGroup.PatrollingSupervisors.length < 1) {
        this.selectedPatrollingGroup.PatrollingSupervisors = [];
      }

      this.selectedPatrollingGroup.PatrollingSupervisors.push(data);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  restoreSupervisor(supervisor) {
    console.log('restoreSupervisor', supervisor);
    this.nfcGuardPatrolBase.getPatrollingSupervisorRestoreById(supervisor.Id).subscribe(data => {
      supervisor.IsRemoved = false;
      console.log('updateSecurityGroupRestore', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Supervisor status as Active ', 1000);
    });
  }

  deleteSupervisor(supervisor) {
    console.log('deleteSupervisor', supervisor);
    this.nfcGuardPatrolBase.getPatrollingSupervisorDeleteById(supervisor.Id).subscribe(data => {
      supervisor.IsRemoved = true;
      console.log('updateSecurityGroupDelete', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Supervisor status as InActive ', 1000);
    });
  }


  // Security Employees ============================================================

  addGuard() {
    var selectSecurityGroupId = this.selectedPatrollingGroup.Id;
    console.log('addGuard data', this.newEmployee);
    this.nfcGuardPatrolBase.postPatrollingEmployeeNew(
      {
        'Employee_Id': this.newEmployee.EmployeeId,
        'Role': this.newEmployee.Role,
        'PatrollingGroup_Id': selectSecurityGroupId
      }
    ).subscribe((data: any) => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new Employee', 1000);
      console.log('addGuard data', data);
      // this.getAllGuards();
      if (this.selectedPatrollingGroup.PatrollingEmployees.length < 1) {
        this.selectedPatrollingGroup.PatrollingEmployees = [];
      }

      this.selectedPatrollingGroup.PatrollingEmployees.push(data);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  restoreEmployee(groupEmployee) {
    console.log('restoreEmployee', groupEmployee);
    this.nfcGuardPatrolBase.getPatrollingEmployeeRestoreById(groupEmployee.Id).subscribe(data => {
      groupEmployee.IsRemoved = false;
      console.log('updateSecurityGroupRestore', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Employee (Guard) status as Active ', 1000);
    });

  }

  deleteEmployee(groupEmployee) {
    console.log('deleteEmployee', groupEmployee);
    this.nfcGuardPatrolBase.getPatrollingEmployeeDeleteById(groupEmployee.Id).subscribe(data => {
      groupEmployee.IsRemoved = true;
      console.log('updateSecurityGroupDelete', data);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Employee (Guard) status as InActive ', 1000);
    });

  }

  getAllGuards() {
    this.nfcGuardPatrolBase.getPatrollingEmployeeAll().subscribe(data => {
      console.log('getAllGuards -> guards', data);
      this.selectedPatrollingGroup.PatrollingEmployees.push(data);
    });
  }

  // getEmployeePicture(guard) {
  //   this.nfcGuardPatrolBase.getUserPictureBase64(guard.Guard_Id).subscribe((base64: string) => {
  //     this.employeePictureBase64 = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64);
  //     console.log('getEmployeePicture', this.employeePictureBase64);
  //   });
  // }

  // getEmployeeDetails(guard) {
  //   this.nfcGuardPatrolBase.getUser(guard.Guard_Id).subscribe(value => {
  //     this.employeeDetails = value;
  //     console.log('getAllGuards', this.employeeDetails);
  //   });
  // }





  // Route ============================================================
  addNewRoute() {
    var selectSecurityGroupId = this.selectedPatrollingGroup.Id;
    this.nfcGuardPatrolBase.postPatrollingRoutes(
      {
        'Name': this.newRoute.Name,
        'Description': this.newRoute.Description,
        'PatrollingGroup_Id': selectSecurityGroupId
        // 'IsActive' : true
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new Route', 1000);
      this.newRoute.Name = null;
      this.newRoute.Description = null;
      this.selectedPatrollingGroup.PatrollingRoutes.push(value);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  onKeydownAddRoute(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.addNewRoute();
    }
  }

  updateRoute(myRoute) {
    this.routeId = myRoute.Id;
    this.updateRouteName = myRoute.Name;
    this.updateRouteDescription = myRoute.Description;
    this.updateRouteIsActive = myRoute.IsActive;
    this.nfcGuardPatrolBase.putPatrollingRoutes(
      {
        'Id': this.routeId,
        'Name': this.updateRouteName,
        'Description': this.updateRouteDescription,
        'IsActive': this.updateRouteIsActive,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new route', 1000);
    });
  }

  updateRouteStatus(route) {
    this.updateRouteIsActive = route.IsActive;
    this.nfcGuardPatrolBase.postPatrollingRouteChangeIsActive(
      {
        'Route_Id': route.Id,
        'IsActive': this.updateRouteIsActive,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new route', 1000);
    });
  }

  updateRouteStatusActive(route) {
    this.nfcGuardPatrolBase.postPatrollingRouteChangeIsActive(
      {
        'Route_Id': route.Id,
        'IsActive': true,
      }
    ).subscribe(value => {
      route.IsActive = true;
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Route status as Active ', 1000);

    });
  }

  updateRouteStatusInActive(route) {
    this.nfcGuardPatrolBase.postPatrollingRouteChangeIsActive(
      {
        'Route_Id': route.Id,
        'IsActive': false,
      }
    ).subscribe(value => {
      route.IsActive = false;
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Route status as InActive ', 1000);
    });
  }

  // getAllRoutes() {
  //   this.showLoader = true;
  //   console.log('getAllRoutes');
  //   this.selectedPatrollingGroup.PatrollingRoutes = [];
  //   this.nfcGuardPatrolBase.getPatrollingRoutesAll()
  //     .subscribe(data => {
  //       // this.routes = data;
  //       console.log('getAllRoutes -> routes', this.routes);
  //       // this.selectedPatrollingGroup.PatrollingRoutes = data;
  //       // console.log('getAllRoutes -> routes', this.selectedPatrollingGroup.PatrollingRoutes);
  //       data.forEach(ele => {
  //         if (ele.PatrollingGroup_Id === this.selectedPatrollingGroup.Id) {
  //           this.selectedPatrollingGroup.PatrollingRoutes.push(ele);
  //         }
  //       });
  //       this.showLoader = true;
  //       console.log('getAllRoutes -> routes', this.selectedPatrollingGroup.PatrollingRoutes);
  //     },
  //       (error: Response | any) => {
  //         this.showLoader = false;
  //         return Observable.throw(new Error(error.status));
  //       });
  // }

  updateRouteTable(route) {
    this.routeId = route;
    console.log('getRouteTableGe RouteID  ->', this.routeId);
    this.nfcGuardPatrolBase.getPatrollingRoutesById(this.routeId.Id)
      .subscribe(data => {
        this.myRoute = data;
        console.log('getRouteTableGe Data  ->', this.myRoute.Name);
      });
  }

  selectPatrollingRoute(route) {
    this.selectedPatrollingTask = null;
    this.selectedPatrollingTag = null;
    this.selectedPatrollingRoute = route;
    console.log('selectPatrollingRoute route', this.selectedPatrollingRoute);
    // this.nfcGuardPatrolBase.getPatrollingTagsByRouteId(route.Id).subscribe(data => {
    //   // this.tags = data;
    //   // console.log('selectPatrollingRoute tags', this.tags);
    //   this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
    //   this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = data;
    // });

    this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags = [];
    route.PatrollingTags.forEach(ele => {
      console.log('selectPatrollingRoute', ele);
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.push(ele);
    });
  }

  unSelectPatrollingRoute() {
    this.selectedPatrollingRoute = null;
    this.tags = null;
  }

  showAddRouteModal() {
    console.log('showAddRouteModal Data  ->', 'showAddRouteModal');
    this.addRouteModal.show();
  }




  // Tag ==============================================================
  addNewTag() {
    this.nfcGuardPatrolBase.postPatrollingTags(
      {
        'Name': this.newTag.Name,
        'Description': this.newTag.Description,
        'IsActive': true,
        'Route_Id': this.selectedPatrollingRoute.Id,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new Tag', 1000);
      this.newTag.Name = null;
      this.newTag.Description = null;
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.push(value);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  onKeydownAddTag(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.addNewTag();
    }
  }

  updateTag(myTag) {
    this.tagId = myTag.Id;
    this.updateTagName = myTag.Name;
    this.updateTagDescription = myTag.Description;
    this.updateTagIsActive = myTag.IsActive;
    this.updateTagIsActive = myTag.Route_Id;
    this.nfcGuardPatrolBase.putPatrollingTags(
      {
        'Id': this.tagId,
        'Name': this.updateTagName,
        'Description': this.updateTagDescription,
        'IsActive': this.updateTagIsActive,
        'Route_Id': this.updateTagIsActive,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new tag', 1000);
    });
    // console.log('updateTag');
  }

  updateTagStatus(tag) {
    this.updateTagIsActive = tag.IsActive;
    this.nfcGuardPatrolBase.postPatrollingTagChangeIsActive(
      {
        'Id': tag.Id,
        'IsActive': this.updateTagIsActive,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new Tag', 1000);
    });
  }

  updateTagStatusActive(tag) {
    this.nfcGuardPatrolBase.postPatrollingTagChangeIsActive(
      {
        'Tag_Id': tag.Id,
        'IsActive': true,
      }
    ).subscribe(value => {
      tag.IsActive = true;
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Tag status as Active ', 1000);
    });
  }

  updateTagStatusInActive(tag) {
    this.nfcGuardPatrolBase.postPatrollingTagChangeIsActive(
      {
        'Tag_Id': tag.Id,
        'IsActive': false,
      }
    ).subscribe(value => {
      tag.IsActive = false;
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Tag status as InActive ', 1000);
    });
  }

  selectPatrollingTag(tag) {
    this.selectedPatrollingTask = null;
    this.selectedPatrollingTag = tag;
    console.log('selectPatrollingTag Tag', this.selectedPatrollingTag);
    // this.nfcGuardPatrolBase.getPatrollingTasksByTagId(tag.Id).subscribe(data => {
    //   // this.tasks = data;
    //   // console.log('selectPatrollingTag tasks', this.tasks);
    //   this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];

    //   if (this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.Id = this.selectedPatrollingTag.Id) {
    //     this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = data;
    //   }
    //   console.log('selectPatrollingTag this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask', this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask);
    // });

    this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask = [];
    tag.PatrollingTask.forEach(ele => {
      console.log('selectPatrollingTag', ele);
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask.push(ele);
    });
  }

  unSelectPatrollingTag() {
    this.selectedPatrollingTag = null;
    this.tasks = null;
  }

  showAddTagModal(selectedRoute) {
    console.log('showAddTagModal Data  ->', selectedRoute);
    this.selectedPatrollingRoute = selectedRoute;
    this.addTagModal.show();
  }


  // Task =============================================================
  addNewTask() {
    this.nfcGuardPatrolBase.postPatrollingTasks(
      {
        'Name': this.newTask.Name,
        'IsActive': true,
        'Tag_Id': this.selectedPatrollingTag.Id,
        // 'PatrollingTaskType': 0
        'PatrollingTaskType': this.newTask.SecurityTaskTypeId
      }
    ).subscribe(value => {
      this.newTask.Name = null;
      this.newTask.IsActive = null;
      this.newTask.Tag_Id = null;
      // this.tasks.push(value);
      this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask.push(value);
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have added a new Task', 1000);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  onKeydownAddTask(event) {
    if (event.key === 'Enter') {
      console.log(event);
      this.addNewTask();
    }
  }

  updateTask(myTask) {
    this.taskId = myTask.Id;
    this.updateTaskName = myTask.Name;
    this.updateTaskIsActive = myTask.IsActive;
    this.updateTaskTag_Id = myTask.Tag_Id;

    this.nfcGuardPatrolBase.putPatrollingTasks(
      {
        'Task_Id': this.taskId,
        'Name': this.updateTaskName,
        'IsActive': this.updateTaskIsActive,
        'Tag_Id': this.updateTaskTag_Id,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new task', 1000);
    });
    console.log('getAllTasks');
  }

  updateTaskStatus(task) {
    this.taskId = task.Id;
    this.updateTaskIsActive = task.IsActive;

    this.nfcGuardPatrolBase.postPatrollingTaskChangeIsActive(
      {
        'Task_Id': task.Id,
        'IsActive': this.updateTaskIsActive,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated a new Task', 1000);
    });
  }

  updateTaskStatusActive(task) {
    this.nfcGuardPatrolBase.postPatrollingTaskChangeIsActive(
      {
        'Task_Id': task.Id,
        'IsActive': true,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Task status as Active ', 1000);
      task.IsActive = true;
    });
  }

  updateTaskStatusInActive(task) {
    this.nfcGuardPatrolBase.postPatrollingTaskChangeIsActive(
      {
        'Task_Id': task.Id,
        'IsActive': false,
      }
    ).subscribe(value => {
      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have updated Task status as InActive ', 1000);
      task.IsActive = false;
    });
  }

  showAddTaskModal(selectedTag) {
    console.log('addTaskModal Data  ->', selectedTag);
    this.selectedPatrollingTag = selectedTag;
    this.removeTasks = [];
    this.addTasks = [];
    this.tasks.forEach(taskItem => {
      this.removeTasks.push(taskItem);
    });
    console.log('addTaskModal removeTasks Data ->', this.removeTasks);

    this.tasklist.forEach(tasklistItem => {
      this.addTasks.push(tasklistItem);
      this.removeTasks.forEach(removeTasksItem => {
        if (tasklistItem.Name === removeTasksItem.Name) {
          var removeIndex = this.addTasks.indexOf(tasklistItem);
          this.addTasks.splice(removeIndex, 1);
        }
      });
    });
    console.log('addTaskModal addTasks Data ->', this.addTasks);
    this.addTaskModal.show();
  }



  addSecurityTask(task) {
    console.log('removeSecurityTask ->', task);
    this.removeTasks.push(task);
    this.addTasks.forEach(addTasksItem => {
      if (addTasksItem.Name === task.Name) {
        var removeIndex = this.addTasks.indexOf(addTasksItem);
        this.addTasks.splice(removeIndex, 1);
      }
    });
  }


  removeSecurityTask(task) {
    console.log('removeSecurityTask ->', task);
    this.addTasks.push(task);
    this.removeTasks.forEach(removeTasksItem => {
      if (removeTasksItem.Name === task.Name) {
        var removeIndex = this.removeTasks.indexOf(removeTasksItem);
        this.removeTasks.splice(removeIndex, 1);
      }
    });
  }



  updateTaskType(task) {
    console.log('updateTaskType', task);

  }

  showUpdateTaskTypeModal(task) {
    this.selectedPatrollingTask = [];
    console.log('showUpdateTaskTypeModal -> this.selectedPatrollingTask', this.selectedPatrollingTask);
    console.log('showUpdateTaskTypeModal -> task', task);
    this.updateTaskTypeModal.show();
    this.selectedPatrollingTask = task;
    console.log('showUpdateTaskTypeModal -> this.selectedPatrollingTask', this.selectedPatrollingTask);
  }


  postTaskTypeUpdate(updateTask) {
    console.log('getTaskTypeUpdate -> this.selectedPatrollingTask', this.selectedPatrollingTask);

    this.nfcGuardPatrolBase.postPatrollingTaskChangeIsType(
      {
        'Task_Id': this.selectedPatrollingTask.Id,
        'PatrollingTaskType': updateTask.SecurityTaskTypeId
      }
    ).subscribe(value => {

      for (let i = 0; i < this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask.length; i++) {
        if (this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask[i].PatrollingTaskType === this.selectedPatrollingTask.Id) {
          this.taskTypes.forEach(ele => {
            if (ele.Id === updateTask.SecurityTaskTypeId) {
              // tslint:disable-next-line:no-unused-expression
              this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask[i].PatrollingTaskType = ele.Id;
              // tslint:disable-next-line:no-unused-expression
              this.selectedPatrollingGroup.PatrollingRoutes.PatrollingTags.PatrollingTask[i].PatrollingTaskTypeDescription = ele.Name;
            }
          });
        }
        break; // Stop this loop, we found it!
      }

      this.nfcGuardPatrolBase.showGtsMsgBox('Hooray!', 'You have Updated Task Type Successfully', 1000);
    });
  }



  download() {
    if (this.downloadDataReport.length > 0) {
      Swal({
        title: 'Export Route Data?',
        text: 'Do you want export Route Data?',
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
          const reportTitle = new String('Routes_Data_');
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
            headers: ['Group', 'Route Id', 'Route Name', 'Route Description', 'Route Status', 'Tag Id', 'Tag Name', 'Tag Description', 'Tag Status', 'TaskId', 'Task Name', 'Task Type', 'Task Status']
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
