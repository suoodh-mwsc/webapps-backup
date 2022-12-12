import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { EServiceBaseService } from './../../services/e-service-base.service';
import { YodaService } from '../../../../../services/yoda.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
declare var Swal: any;


@Component({
  selector: 'app-e-service-application-view',
  templateUrl: './e-service-application-view.component.html',
  styleUrls: ['./e-service-application-view.component.scss']
})
export class EServiceApplicationViewComponent implements OnInit {


  @Input() eServiceApplications: any;
  @Input() eServiceApplicationShowLoader: boolean;

  constructor(private eServiceBase: EServiceBaseService) {
    this.eServiceApplications = {};
    this.eServiceApplicationShowLoader = false;
  }

  ngOnInit() {
  }

}
