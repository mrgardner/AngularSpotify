import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpotifyApolloModule } from './services/apollo.module';
import { ComponentModule } from './components/component.module';
import { ServiceModule } from './services/service.module';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ComponentModule,
    HttpClientModule,
    SpotifyApolloModule,
    ServiceModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
