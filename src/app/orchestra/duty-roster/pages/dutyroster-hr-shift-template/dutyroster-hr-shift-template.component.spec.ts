/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterHrShiftTemplateComponent } from './dutyroster-hr-shift-template.component';

describe('DutyrosterHrShiftTemplateComponent', () => {
  let component: DutyrosterHrShiftTemplateComponent;
  let fixture: ComponentFixture<DutyrosterHrShiftTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterHrShiftTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterHrShiftTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
