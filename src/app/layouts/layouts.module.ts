import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout';
import { HeaderModule } from './components';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    RouterModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutsModule { }
