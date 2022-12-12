/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompLibLoadingSmComponent } from './comp-lib-loading-sm.component';

describe('CompLibLoadingSmComponent', () => {
  let component: CompLibLoadingSmComponent;
  let fixture: ComponentFixture<CompLibLoadingSmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompLibLoadingSmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompLibLoadingSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
