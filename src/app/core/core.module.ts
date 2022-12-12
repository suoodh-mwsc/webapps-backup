import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { CoreRoutingModule } from './core-routing.module';
// Components
import { ErrorLoginTimeOutComponent } from './components/error-login-time-out/error-login-time-out.component';
import { ErrorUnauthorizedComponent } from './components/error-unauthorized/error-unauthorized.component';
// Service
import { AuthGuard } from './services/auth/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  declarations: [
    ErrorLoginTimeOutComponent,
    ErrorUnauthorizedComponent
  ],
  exports: [
    ErrorLoginTimeOutComponent,
    ErrorUnauthorizedComponent
  ],
  providers: [
    AuthGuard
  ],
})
export class CoreModule { }
