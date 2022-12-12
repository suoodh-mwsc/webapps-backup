/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterSupervisorShiftgroupComponent } from './dutyroster-supervisor-shiftgroup.component';

describe('DutyrosterSupervisorShiftgroupComponent', () => {
  let component: DutyrosterSupervisorShiftgroupComponent;
  let fixture: ComponentFixture<DutyrosterSupervisorShiftgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterSupervisorShiftgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterSupervisorShiftgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
