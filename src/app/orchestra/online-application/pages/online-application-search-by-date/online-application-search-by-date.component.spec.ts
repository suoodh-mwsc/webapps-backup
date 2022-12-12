/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlineApplicationSearchByDateComponent } from './online-application-search-by-date.component';

describe('OnlineApplicationSearchByDateComponent', () => {
  let component: OnlineApplicationSearchByDateComponent;
  let fixture: ComponentFixture<OnlineApplicationSearchByDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineApplicationSearchByDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineApplicationSearchByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
