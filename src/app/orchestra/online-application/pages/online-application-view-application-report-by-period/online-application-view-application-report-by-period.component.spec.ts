/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlineApplicationViewApplicationReportByPeriodComponent } from './online-application-view-application-report-by-period.component';

describe('OnlineApplicationViewApplicationReportByPeriodComponent', () => {
  let component: OnlineApplicationViewApplicationReportByPeriodComponent;
  let fixture: ComponentFixture<OnlineApplicationViewApplicationReportByPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineApplicationViewApplicationReportByPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineApplicationViewApplicationReportByPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
