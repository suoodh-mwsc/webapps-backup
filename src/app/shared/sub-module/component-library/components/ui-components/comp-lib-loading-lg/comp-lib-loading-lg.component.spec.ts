/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CompLibLoadingLgComponent } from './comp-lib-loading-lg.component';

describe('CompLibLoadingLgComponent', () => {
  let component: CompLibLoadingLgComponent;
  let fixture: ComponentFixture<CompLibLoadingLgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompLibLoadingLgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompLibLoadingLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
