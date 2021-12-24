// Common
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AngularModule { }
