/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeTilesMenuSysadminComponent } from './home-tiles-menu-sysadmin.component';

describe('HomeTilesMenuSysadminComponent', () => {
  let component: HomeTilesMenuSysadminComponent;
  let fixture: ComponentFixture<HomeTilesMenuSysadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTilesMenuSysadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTilesMenuSysadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
