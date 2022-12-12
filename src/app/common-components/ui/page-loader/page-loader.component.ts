import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { YodaService } from '../../../services/yoda.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent implements OnInit {

  @ViewChild('pageLoaderModel') pageLoaderModel: ElementRef;
  @ViewChild('transactionHistoryModalBackdrop') transactionHistoryModalBackdrop: ElementRef;

  @Input() isLoaded: boolean;
  @Input() data: any;

  isDataLoaded: boolean;
  // data : any;


  constructor(private yoda: YodaService) {
    this.isLoaded = false;
   }


  ngOnInit() {
  }


}
