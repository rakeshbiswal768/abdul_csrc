import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDataManualComponent } from './add-data-manual.component';

describe('AddDataManualComponent', () => {
  let component: AddDataManualComponent;
  let fixture: ComponentFixture<AddDataManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDataManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDataManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
