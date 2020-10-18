import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemSetupComponent } from './menu-item-setup.component';

describe('MenuItemSetupComponent', () => {
  let component: MenuItemSetupComponent;
  let fixture: ComponentFixture<MenuItemSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuItemSetupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
