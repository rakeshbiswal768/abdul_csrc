import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateStartEditComponent } from './template-start-edit.component';

describe('TemplateStartEditComponent', () => {
  let component: TemplateStartEditComponent;
  let fixture: ComponentFixture<TemplateStartEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateStartEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateStartEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
