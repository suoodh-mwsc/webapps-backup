/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyStaffAttendeanceReportComponent } from './my-staff-attendeance-report.component';

describe('MyStaffAttendeanceReportComponent', () => {
  let component: MyStaffAttendeanceReportComponent;
  let fixture: ComponentFixture<MyStaffAttendeanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyStaffAttendeanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyStaffAttendeanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
