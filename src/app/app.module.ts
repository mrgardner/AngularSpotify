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

// Environments
import { environment } from 'environments/environment';

// NgRx
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// NgRx Dev
import { storeFreeze } from 'ngrx-store-freeze';

// Services
import { appServices, spotifyInterceptor } from '@app/services';
import { AngularModule } from './modules/angular.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { reducers } from './store/reducers';
import { effects } from './store/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ApolloModule } from 'apollo-angular';
import { HttpHeaders } from "@angular/common/http";
import { APOLLO_OPTIONS } from "apollo-angular";
import { HttpLink } from 'apollo-angular/http';
import { ApolloLink, InMemoryCache } from '@apollo/client/core';

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
    ApolloModule,
    BrowserModule,
    BrowserAnimationsModule,
    AngularModule,
    AngularMaterialModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal
    }),
  ],
  providers: [
    ...appServices,
    {
      provide: HTTP_INTERCEPTORS, useClass: spotifyInterceptor, multi: true
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        const http = httpLink.create({ uri: 'http://localhost:4000/graphql' });
        const middleware = new ApolloLink((operation, forward) => {
          operation.setContext({
            headers: new HttpHeaders().set(
              'authorization',
              `Bearer ${sessionStorage.getItem('spotifyToken') || null}`,
            ),
          });
          return forward(operation);
        });

        const link = middleware.concat(http);

        return {
          link,
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  exports: [
    AppComponent,
    ...appComponents,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
