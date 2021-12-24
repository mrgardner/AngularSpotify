// Common
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Components
import { LoginCallbackComponent } from './components/login-callback/login-callback.component';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './components/app/app.component';
import { appComponents } from './components';

// Guard
import { AuthGuard } from './guards/auth/auth.guard';

// Modules
import { AngularModule } from './modules/angular.module';
import { AngularMaterialModule } from './modules/angular-material.module';
import { GraphQLModule } from './modules/graphql.module';

// Environments
import { environment } from 'environments/environment';

// NgRx
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { reducers as routerReducer, CustomSerializer } from './store';

// NgRx Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// Services
import { appServices, spotifyInterceptor } from '@app/services';
import { dashboardServices } from '@dashboard/services';
import { playlistServices } from '@playlists/services';
import { trackServices } from '@tracks/services';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
export const ROUTES: Routes = [
  { path: 'callback', component: LoginCallbackComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'collections',
    loadChildren: () => import('@collections/collections.module').then(m => m.CollectionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('@dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'playlists',
    loadChildren: () => import('@playlists/playlists.module').then(m => m.PlaylistsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    loadChildren: () => import('@search/search.module').then(m => m.SearchModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tracks',
    loadChildren: () => import('@tracks/tracks.module').then(m => m.TracksModule),
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

const effects = [];

const reducers = {
  ...routerReducer
};

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
    RouterModule.forRoot(ROUTES, { relativeLinkResolution: 'legacy' }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer
    }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [
    ...appServices,
    ...dashboardServices,
    {
      provide: HTTP_INTERCEPTORS, useClass: spotifyInterceptor, multi: true
    },
    ...playlistServices,
    ...trackServices
  ],
  exports: [
    AppComponent,
    ...appComponents,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
