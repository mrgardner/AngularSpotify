// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth/guards/auth/auth.guard';
import { AngularMaterialModule } from '@core/modules/angular-material.module';
import { AngularModule } from '@core/modules/angular.module';
import { StoreModule } from '@ngrx/store';
import { playlistComponents } from './components';

import { PlaylistTableComponent } from './components/playlist-table/playlist-table.component';
import { playlistPipes } from './pipes';

const ROUTES: Routes = [
  { path: ':name/:id', component: PlaylistTableComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' }
];

@NgModule({
  declarations: [
    ...playlistComponents,
    ...playlistPipes
  ],
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('playlists', {})
  ],
  exports: [
    ...playlistComponents,
    ...playlistPipes
  ]
})
export class PlaylistsModule { }