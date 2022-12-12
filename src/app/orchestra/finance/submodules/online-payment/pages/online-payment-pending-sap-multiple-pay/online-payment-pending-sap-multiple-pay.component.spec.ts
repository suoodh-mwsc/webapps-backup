/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OnlinePaymentPendingSapMultiplePayComponent } from './online-payment-pending-sap-multiple-pay.component';

describe('OnlinePaymentPendingSapMultiplePayComponent', () => {
  let component: OnlinePaymentPendingSapMultiplePayComponent;
  let fixture: ComponentFixture<OnlinePaymentPendingSapMultiplePayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlinePaymentPendingSapMultiplePayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlinePaymentPendingSapMultiplePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
