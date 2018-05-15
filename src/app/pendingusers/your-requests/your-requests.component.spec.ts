import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YourRequestsComponent } from './your-requests.component';

describe('YourRequestsComponent', () => {
  let component: YourRequestsComponent;
  let fixture: ComponentFixture<YourRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YourRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YourRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
