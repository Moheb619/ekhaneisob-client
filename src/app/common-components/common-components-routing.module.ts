import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonComponentsComponent } from './common-components.component';

const routes: Routes = [{ path: '', component: CommonComponentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonComponentsRoutingModule { }
