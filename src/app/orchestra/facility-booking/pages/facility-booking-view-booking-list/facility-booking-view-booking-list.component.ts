import { Component, OnInit } from '@angular/core';
import { FacilityBookingBaseService } from '../../shared/services/facility-booking-base.service';
import { YodaService } from '../../../../services/yoda.service';
// import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

declare var Swal: any;


@Component({
  selector: 'app-facility-booking-view-booking-list',
  templateUrl: './facility-booking-view-booking-list.component.html',
  styleUrls: ['./facility-booking-view-booking-list.component.scss']
})
export class FacilityBookingViewBookingListComponent implements OnInit {
  bookingRequest: any;
  // pendingBookings: any;
  // rejectRequest: any;
  // cancelRequest: any;
  // cancelReason: string;
  // rejectReason: string;
  // modalOptions: NgbModalOptions;

  isRunning: boolean;

  constructor(
    private facilityService: FacilityBookingBaseService,
    private yoda: YodaService,
    // private modalService: NgbModal
  ) {
    // this.cancelRequest = {};
    // this.cancelReason = "";
    // this.rejectRequest = {};
    // this.rejectReason= "";
  }

  ngOnInit() {
    this.getbooking();
  }


  getbooking() {
    // this.isRunning = true;
    this.facilityService.getAllBookings()
      .subscribe(response => {
        console.log('Booking Request', response);
        this.bookingRequest = response;
        // this.isRunning = false;
      });
  }

  // approve(Booking) {
  //   this.isRunning = true;
  //   this.facilityService.approveBooking(Booking.Id)
  //     .subscribe((response: any) => {
  //       Booking.Status = response.Status;
  //       Booking.StatusText = response.StatusText;
  //       console.log("blah", Booking.StatusText);
  //       this.yoda.showSuccess("", "Request Approved");
  //       this.isRunning = false;
  //     }, error => {
  //       this.yoda.showError(error);
  //     });
  // }

  // openRejectModel(bookingRequest, contents) {
  //   this.rejectRequest = bookingRequest;
  //   this.rejectReason = "";
  //   this.modalService.open(contents);
  // }

  // rejectRequestWithReason(rejectRequest) {
  //   this.facilityService.rejectBookingRequest(this.rejectReason, this.rejectRequest.Id)
  //     .subscribe((response: any) => {
  //       console.log("rejectRequestWithReason", response);
  //       rejectRequest.Status = response.Status;
  //       rejectRequest.StatusText = response.StatusText;
  //       this.yoda.showRejectError("", "Request rejected with reason");
  //     },
  //       error => {
  //         console.log(error);
  //         this.yoda.showError(error);
  //       });
  // }
  // reject(Booking) {
  //   this.isRunning = true;
  //   this.facilityService.rejectBooking(Booking.Id)
  //     .subscribe((response : any) => {
  //       Booking.Status = response.Status;
  //       Booking.StatusText = response.StatusText;
  //       this.yoda.showRejectError("", "Request Rejected");
  //       this.isRunning = false;
  //     }, error => {
  //       this.yoda.showError(error);
  //     });
  // }

  // openCancelModal(bookingRequest, content) {
  //   //console.log(content);
  //   this.cancelRequest = bookingRequest;
  //   this.cancelReason = "";
  //   this.modalService.open(content);
  // }

  // cancelRequestWithReason(cancelRequest) {
  //   this.facilityService.cancelBookingRequest(this.cancelReason, this.cancelRequest.Id)
  //     .subscribe(
  //       (response: any) => {
  //         cancelRequest.Status = response.Status;
  //         cancelRequest.StatusText = response.StatusText;
  //         this.yoda.showRejectError("", "Request Canceled");
  //       },
  //       error => {
  //         console.log(error);
  //         this.yoda.showError(error);
  //       });
  // }

}
