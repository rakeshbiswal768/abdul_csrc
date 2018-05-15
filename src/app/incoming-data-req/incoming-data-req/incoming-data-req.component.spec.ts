import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingDataReqComponent } from './incoming-data-req.component';

describe('IncomingDataReqComponent', () => {
  let component: IncomingDataReqComponent;
  let fixture: ComponentFixture<IncomingDataReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingDataReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingDataReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
