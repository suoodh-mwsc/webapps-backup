import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Shared - Pages Component
import { AppTilesCommonMenuComponent } from './ui/app-tiles-common-menu/app-tiles-common-menu.component';
import { AppTilesSysadminMenuComponent } from './ui/app-tiles-sysadmin-menu/app-tiles-sysadmin-menu.component';
import { HomeTilesMenuCommonComponent } from './ui/home-tiles-menu-common/home-tiles-menu-common.component';
import { HomeTilesMenuSysadminComponent } from './ui/home-tiles-menu-sysadmin/home-tiles-menu-sysadmin.component';
import { ResponsiveMenuComponent } from './ui/responsive-menu/responsive-menu.component';
import { PageLoaderComponent } from './ui/page-loader/page-loader.component';

@NgModule({
  declarations: [
    AppTilesCommonMenuComponent,             // Pages-SharedComponents
    AppTilesSysadminMenuComponent,           // Pages-SharedComponents
    HomeTilesMenuCommonComponent,            // Pages-SharedComponents
    HomeTilesMenuSysadminComponent,          // Pages-SharedComponents
    PageLoaderComponent,                     // Pages-SharedComponents
    ResponsiveMenuComponent,                 // Pages-SharedComponents
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    AppTilesCommonMenuComponent,             // Pages-SharedComponents
    AppTilesSysadminMenuComponent,           // Pages-SharedComponents
    HomeTilesMenuCommonComponent,            // Pages-SharedComponents
    HomeTilesMenuSysadminComponent,          // Pages-SharedComponents
    PageLoaderComponent,                     // Pages-SharedComponents
    ResponsiveMenuComponent,                 // Pages-SharedComponents
  ],
  providers: [
  ]
})
export class CommonComponentsModule { }
