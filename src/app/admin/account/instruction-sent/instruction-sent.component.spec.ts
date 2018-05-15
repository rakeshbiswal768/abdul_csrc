import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructionSentComponent } from './instruction-sent.component';

describe('InstructionSentComponent', () => {
  let component: InstructionSentComponent;
  let fixture: ComponentFixture<InstructionSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructionSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructionSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
