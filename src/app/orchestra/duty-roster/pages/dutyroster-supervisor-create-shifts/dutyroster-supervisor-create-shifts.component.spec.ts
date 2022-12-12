/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterSupervisorCreateShiftsComponent } from './dutyroster-supervisor-create-shifts.component';

describe('DutyrosterSupervisorCreateShiftsComponent', () => {
  let component: DutyrosterSupervisorCreateShiftsComponent;
  let fixture: ComponentFixture<DutyrosterSupervisorCreateShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterSupervisorCreateShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterSupervisorCreateShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
