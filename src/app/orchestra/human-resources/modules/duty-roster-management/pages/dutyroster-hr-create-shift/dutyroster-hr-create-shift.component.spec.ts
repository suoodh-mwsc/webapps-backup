/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrCreateShiftComponent } from './dutyroster-hr-create-shift.component';

describe('DutyrosterHrCreateShiftComponent', () => {
  let component: DutyrosterHrCreateShiftComponent;
  let fixture: ComponentFixture<DutyrosterHrCreateShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrCreateShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrCreateShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
