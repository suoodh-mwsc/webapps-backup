import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//
import { SharedRoutingModule } from './shared-routing.module';
//
// import { ComponentLibraryModule } from './sub-module/component-library/component-library.module';

@NgModule({
  imports: [
    CommonModule,
    SharedRoutingModule,
    // ComponentLibraryModule
  ],
  declarations: []
})
export class SharedModule { }
