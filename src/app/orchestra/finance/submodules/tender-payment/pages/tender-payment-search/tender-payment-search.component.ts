import { Component, OnInit } from '@angular/core';
import { TenderPaymentBaseService } from '../../shared/services/tender-payment-base.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-tender-payment-search',
  templateUrl: './tender-payment-search.component.html',
  styleUrls: ['./tender-payment-search.component.scss']
})
export class TenderPaymentSearchComponent implements OnInit {
  showLoader: boolean;
  nowDateTime: any;

  searchDate: any;
  searchValue: string = '';
  searchShowPending: Boolean = false;

  // transaction component - view type
  viewType: any = 'tender-view';
  // Selected tender to Show
  showSelectedTender: Boolean = false;
  selectedTenderPayments: any = [];
  selectedTenderId: any = '';

  transactionsList: any;
  transactionsListWithPagination: any = [];
  // Pagination
  localStorePagination: any = [];
  currentPage: number;
  DefaultPageSize: number = 20;

  constructor(private tenderPayBase: TenderPaymentBaseService) {
    this.searchForPageOneOnly(1);
    this.localStorePagination.currentPage = 1;
  }

  ngOnInit() {
  }

  searchForPageOneOnly(pageNo) {
    this.showLoader = true;
    this.transactionsList = [];
    this.transactionsListWithPagination = [];
    this.tenderPayBase.getTenderDocumentPayments(pageNo, this.DefaultPageSize, this.searchValue).subscribe(data => {
      console.log('data', data);
      console.log('frontsearchValue', this.searchValue)
      console.log('frontDate', this.searchDate)
      this.transactionsList = data.Tenders;
      this.viewSelectedTenderPayments(this.transactionsList[0]);
      this.transactionsListWithPagination = data;
      this.showLoader = false;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  // Pagination goto Previous Page - Last Page Check
  getPaymentsFromShowMore() {
    console.log('getPaymentsFromShowMore', this.transactionsListWithPagination);
    console.log('getPaymentsFromShowMore', this.transactionsListWithPagination.PaginationInfo.PageNumber + 1);
    let tempPage = this.transactionsListWithPagination.PaginationInfo.PageNumber + 1;

    if (tempPage < this.transactionsListWithPagination.PaginationInfo.TotalPages) {
      this.showLoader = true;
      // this.transactionsList = [];
      this.transactionsListWithPagination = [];
      this.tenderPayBase.getTenderDocumentPayments(tempPage, this.DefaultPageSize, this.searchValue).subscribe(data => {
        console.log('data', data);
        console.log('frontsearchValue', this.searchValue)
        console.log('frontDate', this.searchDate)
        this.transactionsList = data.Tenders;
        this.transactionsListWithPagination = data;
        this.showLoader = false;
      },
        (error: Response | any) => {
          this.showLoader = false;
          return Observable.throw(new Error(error.status));
        });
    }

  }


  // Gernate Pagination Array and assign first Page Data from Server
  generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData) {
    for (let i = 1; i <= paginationTotalPages; i++) {
      let tempPageData;
      let tempPageItemNoStart;
      let tempPageItemNoEnd;

      if (i < paginationTotalPages) {
        tempPageItemNoEnd = i * paginationPageSize;
        tempPageItemNoStart = tempPageItemNoEnd - paginationPageSize + 1;
      } else if (i <= paginationTotalPages) {
        tempPageItemNoEnd = paginationTotalItemCount;
        const temp = i * paginationPageSize;
        tempPageItemNoStart = temp - paginationPageSize + 1;
      }

      if (i === 1) {
        tempPageData = pageData;
        this.transactionsList = pageData;
        console.log('transactionsList', this.transactionsList);
        this.localStorePagination.currentPage = i;
        this.localStorePagination.currentPageItemNoStart = tempPageItemNoStart;
        this.localStorePagination.currentPageItemNoEnd = tempPageItemNoEnd;
        this.localStorePagination.totalItemCount = paginationTotalItemCount;
        this.localStorePagination.pageNoStart = i;
        this.localStorePagination.pageNoEnd = paginationTotalPages;
        console.log('localStorePagination', this.localStorePagination);
      } else {
        tempPageData = [];
      }

      const paginationObj = {
        pageNo: i,
        totalPages: paginationTotalPages,
        pageSize: paginationPageSize,
        pageItemNoStart: tempPageItemNoStart,
        pageItemNoEnd: tempPageItemNoEnd,
        totalItemCount: paginationTotalItemCount,
      };
      const pagination = {
        pagination: paginationObj,
        pageData: tempPageData,
      };
      this.transactionsListWithPagination.push(pagination);
    }
    console.log('generateAllPages', this.transactionsListWithPagination);
    localStorage.setItem('LeaveRequestWithPagination', JSON.stringify(this.transactionsListWithPagination));
  }


  viewSelectedTenderPayments(tender) {
    console.log('viewSelectedTenderPayments -> data', tender);
    this.showLoader = true;
    this.selectedTenderPayments = [];
    this.selectedTenderId = tender.tender_id;
    this.tenderPayBase.getTenderDocumentPaymentsWithFilteredByTenderId(tender.tender_id).subscribe(data => {
      this.showLoader = false;
      console.log('viewSelectedTenderPayments -> data', data);
      this.selectedTenderPayments = data;
      this.showSelectedTender = true;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }
}
