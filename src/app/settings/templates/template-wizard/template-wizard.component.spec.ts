import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateWizardComponent } from './template-wizard.component';

describe('TemplateWizardComponent', () => {
  let component: TemplateWizardComponent;
  let fixture: ComponentFixture<TemplateWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
