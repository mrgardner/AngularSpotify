// Common
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './components/app/app.component';
import { appComponents } from './components';

// Guard
import { AuthGuard } from './guards/auth/auth.guard';

// Modules
import { AngularMaterialModule } from './modules/angular-material.module';
import { GraphQLModule } from './modules/graphql.module';

// Environments
import { environment } from 'environments/environment';

// NgRx
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers, effects, CustomSerializer } from './store';

// NgRx Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// Services
import { appServices, spotifyInterceptor } from '@app/services';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
export const ROUTES: Routes = [
  {
    path: 'callback',
    component: LoginCallbackComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard'
  },
];

@NgModule({
  declarations: [
    AppComponent,
    ...appComponents,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    GraphQLModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}, {})
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    ...appServices,
    {
      provide: HTTP_INTERCEPTORS, useClass: spotifyInterceptor, multi: true
    }
  ],
  exports: [
    AppComponent,
    ...appComponents,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
