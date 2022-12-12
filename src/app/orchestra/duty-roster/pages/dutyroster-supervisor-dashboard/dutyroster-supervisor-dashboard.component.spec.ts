/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterSupervisorDashboardComponent } from './dutyroster-supervisor-dashboard.component';

describe('DutyrosterSupervisorDashboardComponent', () => {
  let component: DutyrosterSupervisorDashboardComponent;
  let fixture: ComponentFixture<DutyrosterSupervisorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterSupervisorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterSupervisorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
