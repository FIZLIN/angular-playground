import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ]
})
export class CoreModule { }
