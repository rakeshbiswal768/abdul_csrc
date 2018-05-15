import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCategoriesComponent } from './info-categories.component';

describe('InfoCategoriesComponent', () => {
  let component: InfoCategoriesComponent;
  let fixture: ComponentFixture<InfoCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
