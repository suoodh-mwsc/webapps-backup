import { Component, OnInit } from '@angular/core';
import { DutyRosterBaseService } from './../../../duty-roster/shared/services/duty-roster-base.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-dutyroster-supervisor-dashboard',
  templateUrl: './dutyroster-supervisor-dashboard.component.html',
  styleUrls: ['./dutyroster-supervisor-dashboard.component.scss']
})
export class DutyrosterSupervisorDashboardComponent implements OnInit {


  constructor(
    private dutyRosterBase: DutyRosterBaseService) {
  }

  ngOnInit() {
  }

}
