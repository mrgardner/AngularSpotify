// Common
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { dashboardComponents } from './components';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { reducers, effects } from '@dashboard/store';
import { EffectsModule } from '@ngrx/effects';
import { dashboardServices } from '@dashboard/services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const ROUTES: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
      {
        path: 'test', component: DashboardComponent
      },
      {
        path: 'collections',
        loadChildren: () => import('@collections/collections.module').then(m => m.CollectionsModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'playlist',
        loadChildren: () => import('src/playlist/playlist.module').then(m => m.PlaylistModule),
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
      }
    ]
  },

];

effects

@NgModule({
  declarations: [
    ...dashboardComponents
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('dashboard', reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [
    ...dashboardServices,
  ],
  exports: [
    ...dashboardComponents
  ]
})
export class DashboardModule { }