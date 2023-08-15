import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { AngularModule } from '@app/modules/angular.module';
import { dashboardServices } from '@dashboard/services';
import { dashboardComponents } from './components';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
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
  }
];
@NgModule({
  declarations: [
    ...dashboardComponents
  ],
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    ...dashboardServices
  ],
  exports: [
    ...dashboardComponents
  ]
})
export class DashboardModule { }