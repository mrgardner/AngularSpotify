// Common
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CallbackComponent } from './auth/components/login-callback/login-callback.component';

// Guard
// import { AuthGuard } from './auth/guards/auth/auth.guard';

// Modules
import { AngularModule } from './core/modules/angular.module';
import { AngularMaterialModule } from './core/modules/angular-material.module';
import { GraphQLModule } from './core/modules/graphql.module';
import { LoginComponent } from './auth/components/login/login.component';
import { headerComponents } from './header/components';
import { bottomBarComponents } from './bottom-bar/components';
import { sideNavComponents } from './side-nav/components';
// Environments
import { environment } from 'environments/environment';

// NgRx
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// NgRx Dev
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { effects as headerEffects, reducers as headerReducers } from '@header/store';
import { effects as sideNavEffects, reducers as sideNavReducers } from '@side-nav/store';
import { authServices } from '@auth/services';
import { bottomBarServices } from '@bottom-bar/services';
import { coreServices, spotifyInterceptor } from '@core/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { playlistServices } from '@playlists/services';
import { trackServices } from '@tracks/services';
import { AppComponent } from '../app/core/components/app/app.component';
import { coreComponents } from '@core/components';
import { AuthGuard } from '@auth/guards/auth/auth.guard';


export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [];
export const ROUTES: Routes = [
  { path: 'callback', component: CallbackComponent },
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

const effects = [
  ...headerEffects,
  ...sideNavEffects
];

const reducers = {
  ...headerReducers,
  ...sideNavReducers
};

@NgModule({
  declarations: [
    AppComponent,
    ...bottomBarComponents,
    ...coreComponents,
    ...headerComponents,
    ...sideNavComponents
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
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forRoot({}, {})
  ],
  providers: [
    ...authServices,
    ...bottomBarServices,
    ...coreServices,
    {
      provide: HTTP_INTERCEPTORS, useClass: spotifyInterceptor, multi: true
    },
    ...playlistServices,
    ...trackServices
  ],
  exports: [
    AppComponent,
    ...bottomBarComponents,
    ...coreComponents,
    ...headerComponents,
    ...sideNavComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
