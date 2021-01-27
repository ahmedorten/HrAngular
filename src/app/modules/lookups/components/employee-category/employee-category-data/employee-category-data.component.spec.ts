import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeCategoryDataComponent } from './employee-category-data.component';

describe('EmployeeCategoryDataComponent', () => {
  let component: EmployeeCategoryDataComponent;
  let fixture: ComponentFixture<EmployeeCategoryDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeCategoryDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeCategoryDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
