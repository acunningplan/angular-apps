import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripCardComponent } from './edit-trip-card.component';

describe('EditTripCardComponent', () => {
  let component: EditTripCardComponent;
  let fixture: ComponentFixture<EditTripCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTripCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
