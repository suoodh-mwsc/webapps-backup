/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrShiftgroupComponent } from './dutyroster-hr-shiftgroup.component';

describe('DutyrosterHrShiftgroupComponent', () => {
  let component: DutyrosterHrShiftgroupComponent;
  let fixture: ComponentFixture<DutyrosterHrShiftgroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrShiftgroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrShiftgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
