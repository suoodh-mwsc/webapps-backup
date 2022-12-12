import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentLibraryRoutingModule } from './component-library-routing.module';
import { CompLibLoadingLgComponent } from './components/ui-components/comp-lib-loading-lg/comp-lib-loading-lg.component';
import { CompLibLoadingXlComponent } from './components/ui-components/comp-lib-loading-xl/comp-lib-loading-xl.component';
import { CompLibLoadingSmComponent } from './components/ui-components/comp-lib-loading-sm/comp-lib-loading-sm.component';
import { CompLibLoadingXsComponent } from './components/ui-components/comp-lib-loading-xs/comp-lib-loading-xs.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentLibraryRoutingModule
  ],
  declarations: [
    CompLibLoadingXlComponent,
    CompLibLoadingLgComponent,
    CompLibLoadingSmComponent,
    CompLibLoadingXsComponent,
  ],
  exports: [
    CompLibLoadingXlComponent,
    CompLibLoadingLgComponent,
    CompLibLoadingSmComponent,
    CompLibLoadingXsComponent,
  ],
})
export class ComponentLibraryModule { }
