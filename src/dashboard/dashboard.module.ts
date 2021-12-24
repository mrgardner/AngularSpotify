// Common
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from '@core/modules/angular-material.module';
import { AngularModule } from '@core/modules/angular.module';
import { StoreModule } from '@ngrx/store';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [
    AngularModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('dashboard', {})
  ]
})
export class DashboardModule { }