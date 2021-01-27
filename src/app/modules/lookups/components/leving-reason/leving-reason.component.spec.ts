import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevingReasonComponent } from './leving-reason.component';

describe('LevingReasonComponent', () => {
  let component: LevingReasonComponent;
  let fixture: ComponentFixture<LevingReasonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevingReasonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevingReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
