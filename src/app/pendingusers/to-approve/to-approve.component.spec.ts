import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToApproveComponent } from './to-approve.component';

describe('ToApproveComponent', () => {
  let component: ToApproveComponent;
  let fixture: ComponentFixture<ToApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
