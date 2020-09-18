import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewCardBtnComponent } from './add-new-card-btn.component';

describe('AddNewCardBtnComponent', () => {
  let component: AddNewCardBtnComponent;
  let fixture: ComponentFixture<AddNewCardBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewCardBtnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewCardBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
