/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyStaffAttendanceDetailReportComponent } from './my-staff-attendance-detail-report.component';

describe('MyStaffAttendanceDetailReportComponent', () => {
  let component: MyStaffAttendanceDetailReportComponent;
  let fixture: ComponentFixture<MyStaffAttendanceDetailReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStaffAttendanceDetailReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStaffAttendanceDetailReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
