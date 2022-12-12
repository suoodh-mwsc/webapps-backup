/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrSapUploadOffshiftComponent } from './dutyroster-hr-sap-upload-offshift.component';

describe('DutyrosterHrSapUploadOffshiftComponent', () => {
  let component: DutyrosterHrSapUploadOffshiftComponent;
  let fixture: ComponentFixture<DutyrosterHrSapUploadOffshiftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrSapUploadOffshiftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrSapUploadOffshiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
