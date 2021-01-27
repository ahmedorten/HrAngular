import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsDataComponent } from './documents-data.component';

describe('DocumentsDataComponent', () => {
  let component: DocumentsDataComponent;
  let fixture: ComponentFixture<DocumentsDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
