/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrAppraisalMassAssignAppraisalTypesComponent } from './hr-appraisal-mass-assign-appraisal-types.component';

describe('HrAppraisalMassAssignAppraisalTypesComponent', () => {
  let component: HrAppraisalMassAssignAppraisalTypesComponent;
  let fixture: ComponentFixture<HrAppraisalMassAssignAppraisalTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrAppraisalMassAssignAppraisalTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrAppraisalMassAssignAppraisalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
