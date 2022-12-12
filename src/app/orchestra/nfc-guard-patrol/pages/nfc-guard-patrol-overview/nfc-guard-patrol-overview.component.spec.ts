/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NfcGuardPatrolOverviewComponent } from './nfc-guard-patrol-overview.component';

describe('NfcGuardPatrolOverviewComponent', () => {
  let component: NfcGuardPatrolOverviewComponent;
  let fixture: ComponentFixture<NfcGuardPatrolOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfcGuardPatrolOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfcGuardPatrolOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
