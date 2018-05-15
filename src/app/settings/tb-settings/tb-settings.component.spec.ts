import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TbSettingsComponent } from './build.component';

describe('TbSettingsComponent', () => {
  let component: TbSettingsComponent;
  let fixture: ComponentFixture<TbSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TbSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TbSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
