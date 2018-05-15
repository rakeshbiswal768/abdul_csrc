import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationTypesComponent } from './information-types.component';

describe('InformationTypesComponent', () => {
  let component: InformationTypesComponent;
  let fixture: ComponentFixture<InformationTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
