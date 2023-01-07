import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonComponentsRoutingModule } from './common-components-routing.module';
import { CommonComponentsComponent } from './common-components.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [CommonComponentsComponent, SidebarComponent],
  imports: [CommonModule, CommonComponentsRoutingModule],
  exports: [SidebarComponent],
})
export class CommonComponentsModule {}
