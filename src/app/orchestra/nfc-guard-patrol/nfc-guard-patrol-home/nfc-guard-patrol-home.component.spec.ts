/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolHomeComponent } from './nfc-guard-patrol-home.component';

describe('NfcGuardPatrolHomeComponent', () => {
  let component: NfcGuardPatrolHomeComponent;
  let fixture: ComponentFixture<NfcGuardPatrolHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
