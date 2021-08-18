import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormDeThiComponent } from './form-de-thi.component';

describe('FormDeThiComponent', () => {
  let component: FormDeThiComponent;
  let fixture: ComponentFixture<FormDeThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormDeThiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormDeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
