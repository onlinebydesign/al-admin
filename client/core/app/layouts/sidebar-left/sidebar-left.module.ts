import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { SidebarLeftComponent } from './sidebar-left.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  declarations: [SidebarLeftComponent],
  exports: [SidebarLeftComponent]
})
export class SidebarLeftModule { }
