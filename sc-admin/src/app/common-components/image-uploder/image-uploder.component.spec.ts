import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageUploderComponent } from './image-uploder.component';

describe('ImageUploderComponent', () => {
  let component: ImageUploderComponent;
  let fixture: ComponentFixture<ImageUploderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageUploderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageUploderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
