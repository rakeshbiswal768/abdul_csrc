import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewTagsComponent } from './review-tags.component';

describe('ReviewTagsComponent', () => {
  let component: ReviewTagsComponent;
  let fixture: ComponentFixture<ReviewTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
