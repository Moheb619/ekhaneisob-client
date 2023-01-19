import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListGalleryComponent } from './product-list-gallery.component';

describe('ProductListGalleryComponent', () => {
  let component: ProductListGalleryComponent;
  let fixture: ComponentFixture<ProductListGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
