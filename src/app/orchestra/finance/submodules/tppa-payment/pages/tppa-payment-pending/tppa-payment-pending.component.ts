import { Component, OnInit } from '@angular/core';
import { TppaPaymentBaseService } from '../../shared/services/tppa-payment-base.service';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';
declare var Swal: any;

@Component({
  selector: 'app-tppa-payment-pending',
  templateUrl: './tppa-payment-pending.component.html',
  styleUrls: ['./tppa-payment-pending.component.scss']
})
export class TppaPaymentPendingComponent implements OnInit {

  showLoader: boolean;
  nowDateTime: any;

  searchType: string;
  searchValue: string;
  transactionsList: any;
  transactionsListWithPagination: any = [];

  searchDate: any;
  searchShowPending: Boolean = true;

  // pagination: any = [];
  localStorePagination: any = [];
  currentPage: number;
  DefaultPageSize: number;

  constructor(private tppaPayBase: TppaPaymentBaseService) {
    this.searchForPageOneOnly(1);
    this.localStorePagination.currentPage = 1;
  }

  ngOnInit() {
    this.DefaultPageSize = 10;
  }

  searchForPageOneOnly(pageNo) {
    this.showLoader = true;
    this.transactionsList = [];
    this.transactionsListWithPagination = [];
    // this.tppaPayBase.getTppaPayments(pageNo, this.DefaultPageSize, this.searchValue, this.searchShowPending, this.searchDate).subscribe(data => {
    this.tppaPayBase.getTppaPaymentsPendingsWithPaginationFilter(pageNo, this.DefaultPageSize, this.searchShowPending).subscribe(data => {
      this.showLoader = false;
      console.log('data', data);
      // console.log('transactionsList', this.transactionsList);
      // console.log('transactionsListWithPagination', this.transactionsListWithPagination);
      // Gernerating Array with All Pages
      if (data.PaginationInfo.TotalPages > 0 && !this.transactionsListWithPagination.pageData) {
        // (paginationTotalPages, paginationPageSize, paginationTotalItemCount)
        const paginationTotalPages = data.PaginationInfo.TotalPages;
        const paginationPageSize = data.PaginationInfo.PageSize;
        const paginationTotalItemCount = data.PaginationInfo.ItemCount;
        const pageData = data.Result;
        // this.transactionsList = data.Result;
        // this.transactionsListWithPagination = data;
        this.generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData);
      }
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  searchFromPagination(pageNo) {
    this.showLoader = true;
    this.transactionsList = [];
    this.tppaPayBase.getTppaPaymentsPendingsWithPaginationFilter(pageNo, this.DefaultPageSize, this.searchShowPending).subscribe(data => {
      let showPageMin = pageNo - 6;
      let showPageMax = pageNo + 6;
      this.showLoader = false;
      console.log('searchFromPagination data', data);
      // this.transactionsList = data.Result;
      // this.transactionsListWithPagination = data;
      // console.log('transactionsList', this.transactionsList);
      // console.log('transactionsListWithPagination', this.transactionsListWithPagination);
      this.transactionsList = [];
      if (this.transactionsListWithPagination.length > 0) {
        this.showLoader = true;
        this.transactionsListWithPagination.forEach(ele => {
          this.showLoader = true;
          if (ele.pagination.pageNo === pageNo) {
            this.showLoader = true;
            this.localStorePagination.currentPage = ele.pagination.pageNo;
            this.localStorePagination.currentPageItemNoStart = ele.pagination.pageItemNoStart;
            this.localStorePagination.currentPageItemNoEnd = ele.pagination.pageItemNoEnd;
            console.log('this.localStorePagination.currentPage', this.localStorePagination.currentPage);
            this.transactionsList = data.Result;
            console.log('searchFromPagination', this.transactionsList);
            console.log('requestList', this.transactionsList);
          }
          if (ele.pagination.pageNo === pageNo) {
            ele.pagination.showPageNo = true;
          } else {
            ele.pagination.showPageNo
            if (ele.pagination.pageNo > showPageMin && ele.pagination.pageNo < showPageMax) {
              ele.pagination.showPageNo = true;
            } else {
              ele.pagination.showPageNo = false;
            }
          }
        });
      }
      this.showLoader = false;
    },
      (error: Response | any) => {
        this.showLoader = false;
        return Observable.throw(new Error(error.status));
      });
  }

  // Pagination goto Previous Page - First Page Check
  getTppaFromPaginationPrv(currentPage) {
    if (this.localStorePagination.pageNoStart === currentPage) {
      console.log('Current Page is First Page');
    } else {
      this.searchFromPagination(currentPage);
    }
  }


  // Pagination goto Previous Page - Last Page Check
  getTppaFromPaginationNext(currentPage) {
    if (this.localStorePagination.pageNoEnd === currentPage) {
      console.log('Current Page is Last Page');
    } else {
      this.searchFromPagination(currentPage);
    }
  }


  // Gernate Pagination Array and assign first Page Data from Server
  generateAllPages(paginationTotalPages, paginationPageSize, paginationTotalItemCount, pageData) {
    for (let i = 1; i <= paginationTotalPages; i++) {
      let tempPageData;
      let tempPageItemNoStart;
      let tempPageItemNoEnd;
      let tempShowPageNo;

      if (i <= 10) {
        tempShowPageNo = true;
      } else if (i > 10) {
        tempShowPageNo = false;
      }


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
        showPageNo: tempShowPageNo,
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


}
