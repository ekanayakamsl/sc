import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoryDialogComponent } from './menu-category-dialog.component';

describe('MenuCategoryDialogComponent', () => {
  let component: MenuCategoryDialogComponent;
  let fixture: ComponentFixture<MenuCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCategoryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
