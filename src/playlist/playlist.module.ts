import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { AngularModule } from '@app/modules/angular.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { playlistComponents } from './components';
import { PlaylistTableComponent } from './components/playlist-table/playlist-table.component';
import { playlistPipes } from './pipes';
import { playlistServices } from './services';
import { effects } from './store/effects';
import { reducers } from './store/reducers';

const ROUTES: Routes = [
  {
    path: '', pathMatch: 'full',
    redirectTo: '/dashboard'
  },
  {
    path: ':playlistId',
    component: PlaylistTableComponent,
    canActivate: [AuthGuard]
  }
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
    StoreModule.forFeature('playlist', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    ...playlistServices,
  ],
  exports: [
    ...playlistComponents,
    ...playlistPipes
  ]
})
export class PlaylistModule { }