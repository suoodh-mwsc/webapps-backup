import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';
import { NfcGuardPatrolBaseService } from './../../shared/services/nfc-guard-patrol-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import * as moment from 'moment';

import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-nfc-guard-patrol-overview',
  templateUrl: './nfc-guard-patrol-overview.component.html',
  styleUrls: ['./nfc-guard-patrol-overview.component.scss']
})
export class NfcGuardPatrolOverviewComponent implements OnInit {

  showLoader: boolean;
  viewAsTile: boolean;
  // =============================================================
  // Security Group
  groups: any = [];         // View
  groupsPaginationInfo: any;
  selectedPatrollingGroup: any;
  // =============================================================

  assignedRouteDetails: any = {};

  tabButtons: any;
  selectedTabButton: any = [];
  weekAssignedRoutes: any = [];

  todayDate: any;
  thisYear: any;
  thisWeekNum: any;

  // Assign Security Route
  @ViewChild('showAssignRouteDetailsModal') public showAssignRouteDetailsModal: ModalDirective;

  constructor(
    private nfcGuardPatrolBase: NfcGuardPatrolBaseService) {
    this.viewAsTile = true;
    this.postSecurityGroupOfSupervisor(10, 1);

    this.todayDate = moment().toISOString();
    this.thisYear = moment().format('YYYY');
    this.thisWeekNum = moment(this.todayDate).week();

    var weekNo1 = moment(this.todayDate).subtract(14, 'days').week();
    var weekNo2 = moment(this.todayDate).subtract(7, 'days').week();
    var weekNo3 = moment(this.todayDate).week();
    var weekNo4 = moment(this.todayDate).add(7, 'days').week();
    var weekNo5 = moment(this.todayDate).add(14, 'days').week();
    var weekNo6 = moment(this.todayDate).add(21, 'days').week();

    var year1 = moment(this.todayDate).subtract(14, 'days').format('YYYY');
    var year2 = moment(this.todayDate).subtract(7, 'days').format('YYYY');
    var year3 = moment(this.todayDate).format('YYYY');
    var year4 = moment(this.todayDate).add(7, 'days').format('YYYY');
    var year5 = moment(this.todayDate).add(14, 'days').format('YYYY');
    var year6 = moment(this.todayDate).add(21, 'days').format('YYYY');

    this.tabButtons = [
      { id: 1, title: 'Past Week', weekNo: weekNo1, year: year1, weekDates: [] },
      { id: 2, title: 'Previous Week', weekNo: weekNo2, year: year2, weekDates: [] },
      { id: 3, title: 'Current Week', weekNo: weekNo3, year: year3, weekDates: [] },
      { id: 4, title: 'Next Week', weekNo: weekNo4, year: year4, weekDates: [] },
      { id: 5, title: 'Upcoming Week', weekNo: weekNo5, year: year5, weekDates: [] },
      { id: 6, title: 'Upcoming Week', weekNo: weekNo6, year: year6, weekDates: [] }
    ];
    console.log('tabButtons', this.tabButtons);
  }

  ngOnInit() {

  }



  selectTab(tabButton) {
    var groupId = this.selectedPatrollingGroup.Id;
    this.selectedTabButton = tabButton;
    this.selectedTabButton.weekDates = [];
    var startingDate = moment().day('Sunday').year(this.selectedTabButton.year).week(this.selectedTabButton.weekNo).toDate();
    var endDate = moment(startingDate, 'DD-MM-YYYY').add(7, 'days').toDate();
    let i = 0;
    const max = 7;
    for (i = 0; i < max; i++) {
      var generatedDate = moment(startingDate, 'DD-MM-YYYY').add(i, 'days').toISOString();
      var generatedDateFilter = { Id: i, date: generatedDate };
      this.selectedTabButton.weekDates.push(generatedDateFilter);
    }

    console.log('selectTab -> Dates', this.selectedTabButton.weekDates);

    console.log('selectTab -> startingDate', startingDate);
    console.log('selectTab -> endDate', endDate);

    if (this.selectedTabButton.weekDates) {
      this.nfcGuardPatrolBase.getPatrollingRouteAssignOverview(
        {
          // 'From': startingDate,
          // 'To': endDate,
          'From': this.selectedTabButton.weekDates[0].date,
          'To': this.selectedTabButton.weekDates[6].date,
          'PatrollingGroup_Id': this.selectedPatrollingGroup.Id
        }
      ).subscribe((data: any) => {
        this.showLoader = false;
        console.log('getPatrollingRouteAssignOverview -> All data', data);

        this.weekAssignedRoutes = [
          {
            date: this.selectedTabButton.weekDates[0].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[0].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[0].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[1].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[1].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[1].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[2].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[2].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[2].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[3].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[3].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[3].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[4].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[4].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[4].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[5].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[5].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[5].date)).getDate() && e.Status === 'Completed')
          },
          {
            date: this.selectedTabButton.weekDates[6].date,
            // tslint:disable-next-line:max-line-length
            dailyPendingAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[6].date)).getDate() && e.Status === 'Pending'),
            dailyCompletedAssignedRoutes: data.filter(e => (new Date(e.From)).getDate() === (new Date(this.selectedTabButton.weekDates[6].date)).getDate() && e.Status === 'Completed')
          }
        ];
        console.log('selectTab -> WeekAssignedRoutes.dailyPendingAssignedRoutes', this.weekAssignedRoutes);
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
    }
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
    this.selectedPatrollingGroup = group;
    console.log('selectSecurityGroup route', this.selectedPatrollingGroup);

    this.selectTab(this.tabButtons[2]);
    console.log('selectedTabButton', this.selectedTabButton);

    this.weekAssignedRoutes = [
      { date: this.selectedTabButton.weekDates[0], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[1], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[2], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[3], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[4], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[5], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
      { date: this.selectedTabButton.weekDates[6], dailyPendingAssignedRoutes: [], dailyCompletedAssignedRoutes: [] },
    ];

    console.log('weekAssignedRoutes', this.weekAssignedRoutes);
  }


  unSelectSecurityGroup() {
    this.selectedPatrollingGroup = null;
  }




  showAssignRoute(pendingAssignedRoutes) {
    this.assignedRouteDetails = [];
    console.log('showAssignRoute -> pendingAssignedRoutes', pendingAssignedRoutes);
    this.assignedRouteDetails = pendingAssignedRoutes;
    console.log('showAssignRoute -> assignedRouteDetails', this.assignedRouteDetails);
    this.showAssignRouteDetailsModal.show();
  }

}
