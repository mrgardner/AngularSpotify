// Common
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

// Components
import { AppComponent } from '@components/app/app.component';
import { ComponentModule } from '@components/component.module';

// Services
import { ServiceModule } from '@services/service.module';
import { GraphQLModule } from './graphql.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ComponentModule,
    HttpClientModule,
    ServiceModule,
    GraphQLModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
