/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrSapUploadShiftComponent } from './dutyroster-hr-sap-upload-shift.component';

describe('DutyrosterHrSapUploadShiftComponent', () => {
  let component: DutyrosterHrSapUploadShiftComponent;
  let fixture: ComponentFixture<DutyrosterHrSapUploadShiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrSapUploadShiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrSapUploadShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
