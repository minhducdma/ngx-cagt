/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ChamThiComponent } from './cham-thi.component';

describe('ChamThiComponent', () => {
  let component: ChamThiComponent;
  let fixture: ComponentFixture<ChamThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChamThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChamThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
