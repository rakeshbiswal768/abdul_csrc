import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEncrptComponent } from './data-encrpt.component';

describe('DataEncrptComponent', () => {
  let component: DataEncrptComponent;
  let fixture: ComponentFixture<DataEncrptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataEncrptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataEncrptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
