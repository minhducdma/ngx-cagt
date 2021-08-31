/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HocVienLopHocComponent } from './hoc-vien-lop-hoc.component';

describe('HocVienLopHocComponent', () => {
  let component: HocVienLopHocComponent;
  let fixture: ComponentFixture<HocVienLopHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HocVienLopHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HocVienLopHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
