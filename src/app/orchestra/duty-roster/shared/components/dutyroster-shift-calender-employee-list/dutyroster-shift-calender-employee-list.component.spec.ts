/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterShiftCalenderEmployeeListComponent } from './dutyroster-shift-calender-employee-list.component';

describe('DutyrosterShiftCalenderEmployeeListComponent', () => {
  let component: DutyrosterShiftCalenderEmployeeListComponent;
  let fixture: ComponentFixture<DutyrosterShiftCalenderEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterShiftCalenderEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterShiftCalenderEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
