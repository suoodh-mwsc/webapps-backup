import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EServiceBaseService } from './../../services/e-service-base.service';
import { YodaService } from '../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare var Swal: any;

@Component({
  selector: 'app-e-service-notification-view',
  templateUrl: './e-service-notification-view.component.html',
  styleUrls: ['./e-service-notification-view.component.scss']
})
export class EServiceNotificationViewComponent implements OnInit {

  @Input() eServiceNotifications: any;
  @Input() eServiceNotificationShowLoader: boolean;

  constructor(private eServiceBase: EServiceBaseService) {
    this.eServiceNotifications = {};
    this.eServiceNotificationShowLoader = false;
  }

  ngOnInit() {
  }

}
