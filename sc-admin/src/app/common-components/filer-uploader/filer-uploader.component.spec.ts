import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilerUploaderComponent } from './filer-uploader.component';

describe('FilerUploaderComponent', () => {
  let component: FilerUploaderComponent;
  let fixture: ComponentFixture<FilerUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilerUploaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilerUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
