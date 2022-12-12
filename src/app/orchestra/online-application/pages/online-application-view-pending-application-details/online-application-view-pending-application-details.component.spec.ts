/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlineApplicationViewPendingApplicationDetailsComponent } from './online-application-view-pending-application-details.component';

describe('OnlineApplicationViewPendingApplicationDetailsComponent', () => {
  let component: OnlineApplicationViewPendingApplicationDetailsComponent;
  let fixture: ComponentFixture<OnlineApplicationViewPendingApplicationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineApplicationViewPendingApplicationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineApplicationViewPendingApplicationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
