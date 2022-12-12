/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolSupervisorRoutesAssignComponent } from './nfc-guard-patrol-supervisor-routes-assign.component';

describe('NfcGuardPatrolSupervisorRoutesAssignComponent', () => {
  let component: NfcGuardPatrolSupervisorRoutesAssignComponent;
  let fixture: ComponentFixture<NfcGuardPatrolSupervisorRoutesAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolSupervisorRoutesAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolSupervisorRoutesAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
