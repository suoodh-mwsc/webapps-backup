/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolSupervisorManageRoutesComponent } from './nfc-guard-patrol-supervisor-manage-routes.component';

describe('NfcGuardPatrolSupervisorManageRoutesComponent', () => {
  let component: NfcGuardPatrolSupervisorManageRoutesComponent;
  let fixture: ComponentFixture<NfcGuardPatrolSupervisorManageRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolSupervisorManageRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolSupervisorManageRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
