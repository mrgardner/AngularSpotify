// Common
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { trackComponents } from './components';
import { TrackComponent } from './components/track/track.component';
import { trackServices } from './services';

const ROUTES: Routes = [
  {
    path: 'track/:name/:id',
    component: TrackComponent,
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
    ...trackComponents
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('tracks', {})
  ],
  providers: [
    ...trackServices,
  ],
  exports: [
    ...trackComponents
  ]
})
export class TracksModule { }