/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from './node_modules/@angular/core/testing';
import { By } from './node_modules/@angular/platform-browser';
import { DebugElement } from './node_modules/@angular/core';

import { DutyrosterHrDashboardComponent } from './dutyroster-hr-dashboard.component';

describe('DutyrosterHrDashboardComponent', () => {
  let component: DutyrosterHrDashboardComponent;
  let fixture: ComponentFixture<DutyrosterHrDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
