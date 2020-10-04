import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeSetupComponent } from './customer-type-setup.component';

describe('CustomerTypeSetupComponent', () => {
  let component: CustomerTypeSetupComponent;
  let fixture: ComponentFixture<CustomerTypeSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTypeSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTypeSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
