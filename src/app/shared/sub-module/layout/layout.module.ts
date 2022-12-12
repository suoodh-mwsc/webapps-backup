import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutFooterComponent } from './components/layout-footer/layout-footer.component';
import { LayoutNavbarComponent } from './components/layout-navbar/layout-navbar.component';
import { LayoutSidebarComponent } from './components/layout-sidebar/layout-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule
  ],
  declarations: [
    LayoutFooterComponent,
    LayoutNavbarComponent,
    LayoutSidebarComponent,
  ]
})
export class LayoutModule { }
