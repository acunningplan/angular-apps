import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripCardDetailsComponent } from './trip-card-details.component';

describe('TripCardDetailsComponent', () => {
  let component: TripCardDetailsComponent;
  let fixture: ComponentFixture<TripCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripCardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
