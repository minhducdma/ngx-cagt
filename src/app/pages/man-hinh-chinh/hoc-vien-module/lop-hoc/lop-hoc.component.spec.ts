/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LopHocComponent } from './lop-hoc.component';

describe('LopHocComponent', () => {
  let component: LopHocComponent;
  let fixture: ComponentFixture<LopHocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LopHocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LopHocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
