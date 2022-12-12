/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SadboxComponent } from './sadbox.component';

describe('SadboxComponent', () => {
  let component: SadboxComponent;
  let fixture: ComponentFixture<SadboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SadboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SadboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
