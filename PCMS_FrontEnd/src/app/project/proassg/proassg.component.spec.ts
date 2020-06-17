import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProassgComponent } from './proassg.component';

describe('ProassgComponent', () => {
  let component: ProassgComponent;
  let fixture: ComponentFixture<ProassgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProassgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProassgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
