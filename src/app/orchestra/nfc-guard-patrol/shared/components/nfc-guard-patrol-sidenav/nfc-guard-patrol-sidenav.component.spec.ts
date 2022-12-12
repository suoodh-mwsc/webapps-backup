/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolSidenavComponent } from './nfc-guard-patrol-sidenav.component';

describe('NfcGuardPatrolSidenavComponent', () => {
  let component: NfcGuardPatrolSidenavComponent;
  let fixture: ComponentFixture<NfcGuardPatrolSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
