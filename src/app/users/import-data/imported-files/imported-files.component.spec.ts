import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedFilesComponent } from './imported-files.component';

describe('ImportedFilesComponent', () => {
  let component: ImportedFilesComponent;
  let fixture: ComponentFixture<ImportedFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportedFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportedFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
