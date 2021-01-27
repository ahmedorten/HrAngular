import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingReasonDataComponent } from './leaving-reason-data.component';

describe('LeavingReasonDataComponent', () => {
  let component: LeavingReasonDataComponent;
  let fixture: ComponentFixture<LeavingReasonDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingReasonDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingReasonDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
