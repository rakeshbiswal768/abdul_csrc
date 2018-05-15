import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLinkRequestComponent } from './new-link-request.component';

describe('NewLinkRequestComponent', () => {
  let component: NewLinkRequestComponent;
  let fixture: ComponentFixture<NewLinkRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLinkRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLinkRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
