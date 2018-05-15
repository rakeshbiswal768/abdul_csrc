import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourReqComponent } from './your-req.component';

describe('YourReqComponent', () => {
  let component: YourReqComponent;
  let fixture: ComponentFixture<YourReqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourReqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
