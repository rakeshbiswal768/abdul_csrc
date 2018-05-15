import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingusersComponent } from './pendingusers.component';

describe('PendingusersComponent', () => {
  let component: PendingusersComponent;
  let fixture: ComponentFixture<PendingusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
