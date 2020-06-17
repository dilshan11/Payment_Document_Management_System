import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontpageComponent } from './fontpage.component';

describe('FontpageComponent', () => {
  let component: FontpageComponent;
  let fixture: ComponentFixture<FontpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FontpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
