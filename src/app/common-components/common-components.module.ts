import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsRoutingModule } from './common-components-routing.module';
import { CommonComponentsComponent } from './common-components.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProductBlockGalleryComponent } from './product-block-gallery/product-block-gallery.component';
import { ProductListGalleryComponent } from './product-list-gallery/product-list-gallery.component';

@NgModule({
  declarations: [
    CommonComponentsComponent,
    SidebarComponent,
    ProductBlockGalleryComponent,
    ProductListGalleryComponent,
  ],
  imports: [CommonModule, CommonComponentsRoutingModule],
  exports: [
    SidebarComponent,
    ProductBlockGalleryComponent,
    ProductListGalleryComponent,
  ],
})
export class CommonComponentsModule {}
