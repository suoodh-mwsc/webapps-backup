/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterShiftCalenderWeekViewComponent } from './dutyroster-shift-calender-week-view.component';

describe('DutyrosterShiftCalenderWeekViewComponent', () => {
  let component: DutyrosterShiftCalenderWeekViewComponent;
  let fixture: ComponentFixture<DutyrosterShiftCalenderWeekViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterShiftCalenderWeekViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterShiftCalenderWeekViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
