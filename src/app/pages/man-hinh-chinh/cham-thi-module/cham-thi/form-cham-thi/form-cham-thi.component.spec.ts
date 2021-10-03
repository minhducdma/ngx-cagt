/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormChamThiComponent } from './form-cham-thi.component';

describe('FormChamThiComponent', () => {
  let component: FormChamThiComponent;
  let fixture: ComponentFixture<FormChamThiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormChamThiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormChamThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
