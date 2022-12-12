/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrDeskReportMedicalCertificateByYearComponent } from './hr-desk-report-medical-certificate-by-year.component';

describe('HrDeskReportMedicalCertificateByYearComponent', () => {
  let component: HrDeskReportMedicalCertificateByYearComponent;
  let fixture: ComponentFixture<HrDeskReportMedicalCertificateByYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrDeskReportMedicalCertificateByYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrDeskReportMedicalCertificateByYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
