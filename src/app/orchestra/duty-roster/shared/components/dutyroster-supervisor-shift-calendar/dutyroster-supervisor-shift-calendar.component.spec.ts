/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterSupervisorShiftCalendarComponent } from './dutyroster-supervisor-shift-calendar.component';

describe('DutyrosterSupervisorShiftCalendarComponent', () => {
  let component: DutyrosterSupervisorShiftCalendarComponent;
  let fixture: ComponentFixture<DutyrosterSupervisorShiftCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterSupervisorShiftCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterSupervisorShiftCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
