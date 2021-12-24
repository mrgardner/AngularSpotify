// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { AngularModule } from '@app/modules/angular.module';
import { StoreModule } from '@ngrx/store';
import { trackComponents } from './components';
import { TrackComponent } from './components/track/track.component';


const ROUTES: Routes = [
  { path: 'track/:name/:id', component: TrackComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];


@NgModule({
  declarations: [
    ...trackComponents
  ],
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('tracks', {})
  ],
  exports: [
    ...trackComponents
  ]
})
export class TracksModule { }