/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecruitmentManageRecruitmentRequestsComponent } from './recruitment-manage-recruitment-requests.component';

describe('RecruitmentManageRecruitmentRequestsComponent', () => {
  let component: RecruitmentManageRecruitmentRequestsComponent;
  let fixture: ComponentFixture<RecruitmentManageRecruitmentRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentManageRecruitmentRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentManageRecruitmentRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
