import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerToolsComponent } from './computer-tools.component';

describe('ComputerToolsComponent', () => {
  let component: ComputerToolsComponent;
  let fixture: ComponentFixture<ComputerToolsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComputerToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComputerToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
