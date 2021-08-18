import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeThiComponent } from './de-thi.component';

describe('DethiComponent', () => {
  let component: DeThiComponent;
  let fixture: ComponentFixture<DeThiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeThiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeThiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
