import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavingReasonListComponent } from './leaving-reason-list.component';

describe('LeavingReasonListComponent', () => {
  let component: LeavingReasonListComponent;
  let fixture: ComponentFixture<LeavingReasonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeavingReasonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeavingReasonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
