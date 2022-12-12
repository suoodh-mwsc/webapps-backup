/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DutyrosterMyDutyrosterComponent } from './dutyroster-my-dutyroster.component';

describe('DutyrosterMyDutyrosterComponent', () => {
  let component: DutyrosterMyDutyrosterComponent;
  let fixture: ComponentFixture<DutyrosterMyDutyrosterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyrosterMyDutyrosterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyrosterMyDutyrosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
