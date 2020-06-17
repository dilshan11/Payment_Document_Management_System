import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IpatestComponent } from './ipatest.component';

describe('IpatestComponent', () => {
  let component: IpatestComponent;
  let fixture: ComponentFixture<IpatestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IpatestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IpatestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
