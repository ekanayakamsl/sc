import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTypeDialogComponent } from './customer-type-dialog.component';

describe('CustomerTypeDialogComponent', () => {
  let component: CustomerTypeDialogComponent;
  let fixture: ComponentFixture<CustomerTypeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerTypeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
