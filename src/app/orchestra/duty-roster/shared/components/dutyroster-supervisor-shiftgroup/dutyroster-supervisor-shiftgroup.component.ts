import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { DutyRosterBaseService } from './../../../../duty-roster/shared/services/duty-roster-base.service';
import { ModalDirective } from 'ngx-bootstrap';
import { YodaService } from './../../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-dutyroster-supervisor-shiftgroup',
  templateUrl: './dutyroster-supervisor-shiftgroup.component.html',
  styleUrls: ['./dutyroster-supervisor-shiftgroup.component.scss']
})
export class DutyrosterSupervisorShiftgroupComponent implements OnInit {

  @Input('shiftGroupsParent') public shiftGroups: any;
  @Input() public shiftGroupsPaginationInfo: any;
  @Input() public shiftGroupsPaginationLocal: any;
  @Input() public shiftGroupShowLoader: boolean;


  @Output() public selectedShiftGroupChild = new EventEmitter();

  selectedShiftGroupVar: any;

  selectShiftGroup(shiftGroup) {
    this.selectedShiftGroupVar = shiftGroup;
    this.selectedShiftGroupChild.emit(this.selectedShiftGroupVar);
    console.log('selectShiftGroup -> localShiftGroup', this.selectedShiftGroupChild);
  }

  // @Output() valueChange = new EventEmitter();
  // sum = 0;
  // changeValue() { 
  //     // You can give any function name
  //     this.sum = this.sum + 10;
  //     this.valueChange.emit(this.sum);
  // }


  constructor(
    private dutyRosterBase: DutyRosterBaseService) {
    this.shiftGroups = {};
    this.shiftGroupsPaginationInfo = {};
    this.shiftGroupShowLoader = false;
    this.shiftGroupsPaginationLocal = [];
  }

  ngOnInit() {
  }

  viewMoreShiftGroups(pageSize, pageNum) {
    this.shiftGroupShowLoader = true;
    this.shiftGroupsPaginationLocal.PageSize = pageSize;
    this.shiftGroupsPaginationLocal.PageNumber = pageNum;
    this.dutyRosterBase.postShiftGroupsAssignedToSupervisor(
      {
        'PageSize': this.shiftGroupsPaginationLocal.PageSize,
        'PageNumber': this.shiftGroupsPaginationLocal.PageNumber
      }
    ).subscribe(data => {
      this.shiftGroupsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(element => {
        this.shiftGroups.push(element);
      });
      console.log('getAllShiftGroups - shiftGroups Data ->', this.shiftGroups);
      this.shiftGroupShowLoader = false;
    }, (error: Response | any) => {
      this.shiftGroupShowLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }

}
