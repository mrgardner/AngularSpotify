// Common
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, isDevMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
import { RouterState, StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

// NgRx Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// Services
import { appServices, spotifyInterceptor } from '@app/services';
import { authReducer } from './store/reducers/auth.reducer';
import { AuthEffects } from './store/effects/auth.effect';
import { AngularModule } from './modules/angular.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

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
    AngularModule,
    AngularMaterialModule,
    GraphQLModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({ router: routerReducer, auth: authReducer }),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    })
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
