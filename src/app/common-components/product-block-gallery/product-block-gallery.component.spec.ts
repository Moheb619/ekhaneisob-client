import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBlockGalleryComponent } from './product-block-gallery.component';

describe('ProductBlockGalleryComponent', () => {
  let component: ProductBlockGalleryComponent;
  let fixture: ComponentFixture<ProductBlockGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductBlockGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBlockGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
