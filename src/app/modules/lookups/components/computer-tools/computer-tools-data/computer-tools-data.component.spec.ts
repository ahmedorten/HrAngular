import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerToolsDataComponent } from './computer-tools-data.component';

describe('ComputerToolsDataComponent', () => {
  let component: ComputerToolsDataComponent;
  let fixture: ComponentFixture<ComputerToolsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerToolsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerToolsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
