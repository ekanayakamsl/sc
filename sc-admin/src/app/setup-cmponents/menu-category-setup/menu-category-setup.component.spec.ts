import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategorySetupComponent } from './menu-category-setup.component';

describe('MenuCategorySetupComponent', () => {
  let component: MenuCategorySetupComponent;
  let fixture: ComponentFixture<MenuCategorySetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCategorySetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuCategorySetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
