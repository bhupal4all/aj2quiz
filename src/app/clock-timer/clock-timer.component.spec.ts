import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClockTimerComponent } from './clock-timer.component';

describe('ClockTimerComponent', () => {
  let component: ClockTimerComponent;
  let fixture: ComponentFixture<ClockTimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClockTimerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClockTimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
