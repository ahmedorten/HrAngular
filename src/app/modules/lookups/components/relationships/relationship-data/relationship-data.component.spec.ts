import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationshipDataComponent } from './relationship-data.component';

describe('RelationshipDataComponent', () => {
  let component: RelationshipDataComponent;
  let fixture: ComponentFixture<RelationshipDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationshipDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationshipDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
