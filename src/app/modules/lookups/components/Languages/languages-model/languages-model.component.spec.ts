import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguagesModelComponent } from './languages-model.component';

describe('LanguagesModelComponent', () => {
  let component: LanguagesModelComponent;
  let fixture: ComponentFixture<LanguagesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguagesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguagesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
