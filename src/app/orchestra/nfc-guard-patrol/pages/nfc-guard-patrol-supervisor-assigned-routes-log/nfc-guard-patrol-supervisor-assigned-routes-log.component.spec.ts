/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolSupervisorAssignedRoutesLogComponent } from './nfc-guard-patrol-supervisor-assigned-routes-log.component';

describe('NfcGuardPatrolSupervisorAssignedRoutesLogComponent', () => {
  let component: NfcGuardPatrolSupervisorAssignedRoutesLogComponent;
  let fixture: ComponentFixture<NfcGuardPatrolSupervisorAssignedRoutesLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolSupervisorAssignedRoutesLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolSupervisorAssignedRoutesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
