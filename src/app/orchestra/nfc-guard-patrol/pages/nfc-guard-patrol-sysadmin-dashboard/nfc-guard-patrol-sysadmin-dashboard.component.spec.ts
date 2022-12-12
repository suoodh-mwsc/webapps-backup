/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolSysadminDashboardComponent } from './nfc-guard-patrol-sysadmin-dashboard.component';

describe('NfcGuardPatrolSysadminDashboardComponent', () => {
  let component: NfcGuardPatrolSysadminDashboardComponent;
  let fixture: ComponentFixture<NfcGuardPatrolSysadminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolSysadminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolSysadminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
