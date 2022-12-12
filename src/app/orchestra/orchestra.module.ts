import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Routing
import { OrchestraRoutingModule } from './orchestra-routing.module';
// Modules
import { AdminconsoleModule } from './adminconsole/adminconsole.module';
import { NfcGuardPatrolModule } from './nfc-guard-patrol/nfc-guard-patrol.module';
import { DutyRosterModule } from './duty-roster/duty-roster.module';
import { HumanResourcesModule } from './human-resources/human-resources.module';
import { FinanceModule } from './finance/finance.module';
import { OnlineApplicationModule } from './online-application/online-application.module';
import { FacilityBookingModule } from './facility-booking/facility-booking.module';
import { EServiceModule } from './e-service/e-service.module';
import { SelfCareModule } from './self-care/self-care.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    OrchestraRoutingModule,
    AdminconsoleModule,
    NfcGuardPatrolModule,
    DutyRosterModule,
    HumanResourcesModule,
    FinanceModule,
    OnlineApplicationModule,
    FacilityBookingModule,
    EServiceModule,
    SelfCareModule,
  ],
  declarations: []
})
export class OrchestraModule { }
