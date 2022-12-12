/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlinePaymentSapMultiplePayTransactionComponent } from './online-payment-sap-multiple-pay-transaction.component';

describe('OnlinePaymentSapMultiplePayTransactionComponent', () => {
  let component: OnlinePaymentSapMultiplePayTransactionComponent;
  let fixture: ComponentFixture<OnlinePaymentSapMultiplePayTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePaymentSapMultiplePayTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentSapMultiplePayTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
