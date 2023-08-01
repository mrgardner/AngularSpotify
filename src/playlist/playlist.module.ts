// Common
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { playlistComponents } from './components';

import { PlaylistTableComponent } from './components/playlist-table/playlist-table.component';
import { playlistPipes } from './pipes';
import { playlistServices } from './services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { reducers } from '@dashboard/store';

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
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('playlist', reducers)
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