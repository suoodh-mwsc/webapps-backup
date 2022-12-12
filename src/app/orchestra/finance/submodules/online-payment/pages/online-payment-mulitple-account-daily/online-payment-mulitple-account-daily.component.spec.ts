/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlinePaymentMulitpleAccountDailyComponent } from './online-payment-mulitple-account-daily.component';

describe('OnlinePaymentMulitpleAccountDailyComponent', () => {
  let component: OnlinePaymentMulitpleAccountDailyComponent;
  let fixture: ComponentFixture<OnlinePaymentMulitpleAccountDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePaymentMulitpleAccountDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentMulitpleAccountDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
