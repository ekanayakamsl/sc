import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealogAddCatComponent } from './dealog-add-cat.component';

describe('DealogAddCatComponent', () => {
  let component: DealogAddCatComponent;
  let fixture: ComponentFixture<DealogAddCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealogAddCatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealogAddCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
