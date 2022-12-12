/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrTestComponent } from './hr-test.component';

describe('HrTestComponent', () => {
  let component: HrTestComponent;
  let fixture: ComponentFixture<HrTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
