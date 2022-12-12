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

@Component({
  selector: 'app-dutyroster-hr-shift-template',
  templateUrl: './dutyroster-hr-shift-template.component.html',
  styleUrls: ['./dutyroster-hr-shift-template.component.scss']
})
export class DutyrosterHrShiftTemplateComponent implements OnInit {

  showLoader: boolean;

  allShiftTemplates: any = [];
  newShiftTemplate: any = [];
  selectedShiftTemplate: any = [];
  selectedShiftTemplatesTime: any = [];

  newShiftTemplatesTime: any = [];


  constructor(private dutyRosterBase: DutyRosterBaseService, private yoda: YodaService) {
    this.getShiftTemplatesAll();
  }


  ngOnInit() {
  }


  // postShiftTemplatesNew(DataBody)
  createNewShiftTemplate() {
    this.dutyRosterBase.postShiftTemplatesNew(
      {
        'Name': this.newShiftTemplate.Name,
      }
    ).subscribe((data: any) => {
      console.log('createNewShiftTemplate data', data);
      this.allShiftTemplates.push(data);
      console.log('createNewShiftTemplate - allShiftTemplates Data ->', this.allShiftTemplates);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }


  onKeydownAddShiftTemplate(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.createNewShiftTemplate();
    }
  }


  getShiftTemplatesAll() {
    this.showLoader = true;
    this.dutyRosterBase.getShiftTemplatesAll().subscribe((data: any) => {
      this.showLoader = false;
      // console.log('getShiftTemplatesAll Data', data);
      data.forEach(element => {
        this.allShiftTemplates.push(element);
      });
      console.log('getShiftTemplatesAll - Data ->', this.allShiftTemplates);
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  // getShiftTemplatesByShiftTemplateId(ShiftTemplateId)








  selectShiftTemplate(shiftTemplate) {
    this.selectedShiftTemplate = shiftTemplate;
    console.log('selectShiftTemplate ->', this.selectedShiftTemplate);
  }


  unselectShiftTemplate(shiftTemplate) {
    this.selectedShiftTemplate = [];
    console.log('unselectShiftTemplate ->', this.selectedShiftTemplate);
  }


  deleteShiftTemplate(shiftTemplate) {
  }


  restoreShiftTemplate(shiftTemplate) {
  }


  // postShiftTemplatesTimesNew(DataBody)
  createNewShiftTemplatesTime() {
    this.dutyRosterBase.postShiftTemplatesTimesNew(
      {
        'Name': this.newShiftTemplatesTime.Name,
        'StartingHour': this.newShiftTemplatesTime.StartingHour,
        'StartingMinute': this.newShiftTemplatesTime.StartingMinute,
        'EndingHour': this.newShiftTemplatesTime.EndingHour,
        'EndingMinute': this.newShiftTemplatesTime.EndingMinute,
        'ShiftTemplate_Id': this.selectedShiftTemplate.Id
      }
    ).subscribe((data: any) => {
      // console.log('createNewShiftTemplatesTime data', data);
      let i = 0;

      if (this.selectedShiftTemplate.Times.length > 1) {
        i = this.selectedShiftTemplate.Times.length + 1;
      } else {
        i = 1;
        this.selectedShiftTemplate.Times = [];
      }

      let arrayFilterData = {
        Id: i,
        ShiftTemplate_Id: this.selectedShiftTemplate.Id,
        Name: this.newShiftTemplatesTime.Name,
        StartingHour: this.newShiftTemplatesTime.StartingHour,
        StartingMinute: this.newShiftTemplatesTime.StartingMinute,
        EndingHour: this.newShiftTemplatesTime.EndingHour,
        EndingMinute: this.newShiftTemplatesTime.EndingMinute,
        IsDeleted: false
      };

      this.selectedShiftTemplate.Times.push(arrayFilterData);
      console.log('createNewShiftTemplatesTime - selectedShiftTemplate Data ->', this.selectedShiftTemplate);
    },
      (error: Response | any) => {
        return Observable.throw(new Error(error.status));
      });
  }

  onKeydownAddShiftTemplatesTime(event) {
    // tslint:disable-next-line:quotemark
    if (event.key === "Enter") {
      console.log(event);
      this.createNewShiftTemplatesTime();
    }
  }


  // postShiftTemplatesTimesRemove(DataBody)
  deleteShiftTemplateTime(shiftTemplateTime) {

  }

  restoreShiftTemplateTime(shiftTemplateTime) {

  }

}
