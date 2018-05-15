import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyToApproveComponent } from './my-to-approve.component';

describe('MyToApproveComponent', () => {
  let component: MyToApproveComponent;
  let fixture: ComponentFixture<MyToApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyToApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyToApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
