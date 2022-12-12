import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { ItadminRootRoutingModule } from './itadmin-root-routing.module';
// Pages-Components
import { ItadminActiveDirectoryComponent } from './pages/itadmin-active-directory/itadmin-active-directory.component';
// Plugins
// Services
import { ItadminRootBaseService } from './services/itadmin-root-base.service';

@NgModule({
  imports: [
    CommonModule,
    ItadminRootRoutingModule
  ],
  exports: [
    ItadminActiveDirectoryComponent
  ],
  declarations: [
    ItadminActiveDirectoryComponent
  ],
  providers: [
    ItadminRootBaseService
  ]
})
export class ItadminRootModule { }
