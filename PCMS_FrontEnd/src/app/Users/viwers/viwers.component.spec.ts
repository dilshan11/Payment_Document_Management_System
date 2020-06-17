import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViwersComponent } from './viwers.component';

describe('ViwersComponent', () => {
  let component: ViwersComponent;
  let fixture: ComponentFixture<ViwersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViwersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViwersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
