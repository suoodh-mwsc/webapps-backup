/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RecruitmentManageApplicationShortlistsComponent } from './recruitment-manage-application-shortlists.component';

describe('RecruitmentManageApplicationShortlistsComponent', () => {
  let component: RecruitmentManageApplicationShortlistsComponent;
  let fixture: ComponentFixture<RecruitmentManageApplicationShortlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecruitmentManageApplicationShortlistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecruitmentManageApplicationShortlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
