import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerToolsListComponent } from './computer-tools-list.component';

describe('ComputerToolsListComponent', () => {
  let component: ComputerToolsListComponent;
  let fixture: ComponentFixture<ComputerToolsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerToolsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerToolsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
