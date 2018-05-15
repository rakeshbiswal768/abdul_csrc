import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPaymentComponent } from './plan-payment.component';

describe('PlanPaymentComponent', () => {
  let component: PlanPaymentComponent;
  let fixture: ComponentFixture<PlanPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
