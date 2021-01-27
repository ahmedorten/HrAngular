import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkStatusComponent } from './employee-work-status.component';

describe('EmployeeWorkStatusComponent', () => {
  let component: EmployeeWorkStatusComponent;
  let fixture: ComponentFixture<EmployeeWorkStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeWorkStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeWorkStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
