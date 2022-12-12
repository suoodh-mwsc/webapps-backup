import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
// Main Routing
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// Auth
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Adal5Service, Adal5HTTPService } from 'adal-angular5';
import { AuthGuard } from './core/services/auth/auth-guard';
import { AuthService } from './core/services/auth/auth.service';
// Modules
import { CoreModule } from './core/core.module';
import { OrchestraModule } from './orchestra/orchestra.module';
import { SharedModule } from './shared/shared.module';
import { CommonComponentsModule } from './common-components/common-components.module';
// Services
import { YodaService } from './services/yoda.service';
// Home Component
import { HomeComponent } from './home/home.component';
// Common Components
import { AppTilesCommonMenuComponent } from './common-components/ui/app-tiles-common-menu/app-tiles-common-menu.component';
import { UiBaseService } from './core/services/ui-setup/ui-base.service';
import { GlobalBaseService } from './core/services/ui-setup/global-base.service';
import { ApiBaseService } from './core/services/api-related/api-base.service';

import { NgxJsonViewerModule } from 'ngx-json-viewer';


@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      AppRoutingModule,
      CoreModule,          // Module
      OrchestraModule,     // Module
      SharedModule,        // Module
      CommonComponentsModule,
      NgxJsonViewerModule
   ],
   exports: [
      // AppTilesCommonMenuComponent
   ],
   providers: [
      AuthGuard,
      AuthService,
      UiBaseService,
      GlobalBaseService,
      ApiBaseService,
      YodaService,
      Adal5Service,
      {
         provide: Adal5HTTPService,
         useFactory: Adal5HTTPService.factory,
         deps: [HttpClient, Adal5Service]
      }
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
