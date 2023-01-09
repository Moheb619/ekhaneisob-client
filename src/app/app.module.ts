import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CommonComponentsModule } from './common-components/common-components.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, CommonComponentsModule],
})
export class AppModule {}
