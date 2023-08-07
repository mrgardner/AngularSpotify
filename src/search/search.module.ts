import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/guards/auth/auth.guard';
import { AngularMaterialModule } from '@app/modules/angular-material.module';
import { StoreModule } from '@ngrx/store';
import { searchComponents } from './components';
import { SearchComponent } from './components/search/search.component';

const ROUTES: Routes = [
  {
    path: '',
    component: SearchComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  declarations: [
    ...searchComponents
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('search', {})
  ],
  exports: [...searchComponents]
})
export class SearchModule { }