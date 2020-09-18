import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTimeSetupComponent } from './dining-time-setup.component';

describe('DiningTimeSetupComponent', () => {
  let component: DiningTimeSetupComponent;
  let fixture: ComponentFixture<DiningTimeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiningTimeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningTimeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
