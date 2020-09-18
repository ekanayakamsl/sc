import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiningTimeDialogComponent } from './dining-time-dialog.component';

describe('DiningTimeDialogComponent', () => {
  let component: DiningTimeDialogComponent;
  let fixture: ComponentFixture<DiningTimeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiningTimeDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiningTimeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
