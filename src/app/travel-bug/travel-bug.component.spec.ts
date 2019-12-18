import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelBugComponent } from './travel-bug.component';

describe('TravelBugComponent', () => {
  let component: TravelBugComponent;
  let fixture: ComponentFixture<TravelBugComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelBugComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelBugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
