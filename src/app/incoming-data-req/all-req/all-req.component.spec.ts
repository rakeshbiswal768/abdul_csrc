import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllReqComponent } from './all-req.component';

describe('AllReqComponent', () => {
  let component: AllReqComponent;
  let fixture: ComponentFixture<AllReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
