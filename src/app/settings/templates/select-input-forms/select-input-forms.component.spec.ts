import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInputFormsComponent } from './select-input-forms.component';

describe('SelectInputFormsComponent', () => {
  let component: SelectInputFormsComponent;
  let fixture: ComponentFixture<SelectInputFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectInputFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectInputFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
