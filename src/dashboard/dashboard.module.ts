// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { AngularModule } from '@app/modules/angular.module';
import { StoreModule } from '@ngrx/store';
import { dashboardComponents } from './components';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  declarations: [
    ...dashboardComponents
  ],
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('dashboard', {})
  ],
  exports: [
    ...dashboardComponents
  ]
})
export class DashboardModule { }