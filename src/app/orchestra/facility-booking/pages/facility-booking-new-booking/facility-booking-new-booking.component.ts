import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, Input } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject } from 'rxjs/Subject';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { ModalDirective, BsModalService } from 'ngx-bootstrap';

import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { FacilityBookingBaseService } from '../../shared/services/facility-booking-base.service';
import { YodaService } from '../../../../services/yoda.service';
import { error } from 'util';

declare var Swal: any;

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-facility-booking-new-booking',
  templateUrl: './facility-booking-new-booking.component.html',
  styleUrls: ['./facility-booking-new-booking.component.scss']
})
export class FacilityBookingNewBookingComponent implements OnInit {

  // @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('bookingModal') public bookingModal: ModalDirective;

  view: String = 'month';
  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  isRunning: boolean;
  bookingDetails: any;
  actions: CalendarEventAction[] = [];
  refresh: Subject<any> = new Subject();
  events: CalendarEvent[] = [];
  activeDayIsOpen: Boolean = false;
  salesFacility: any;
  newBooking: any;
  allBooking: any = [];
  col: any = [];
  salesReason: any;
  salesCustomerType: any;
  bookingType: any;
  IsDeleted: boolean;

  modalReference: any;

  constructor(
    private facilityService: FacilityBookingBaseService,
    private yoda: YodaService,
  ) {
    this.newBooking = {};

    this.isRunning = true;
    this.facilityService.getFacilities()
      .subscribe((response: any) => {
        this.salesFacility = response;
        this.isRunning = false;
      });

    // SalesEvents
    this.facilityService.getSalesReason()
      .subscribe(response => {
        this.salesReason = response;
      });

    // GET CUSTOMER TYPE
    this.facilityService.getCustomerType()
      .subscribe(response => {
        this.salesCustomerType = response;
      });

    // GET BOOKING TYPES
    this.facilityService.getBookingType()
      .subscribe(response => {
        this.bookingType = response;
      });

    this.facilityService.getAllBookings()
      .subscribe(response => {
        this.allBooking = response;
        this.updateCalendarEvents();
      },
        error => {
          this.yoda.showError(error);
        });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }


  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    if (action === 'Clicked') {
      this.yoda.get('Organization/Facility/Booking/' + event.id)
        .subscribe(data => {
          this.bookingDetails = data;
          // Update Calendar with Latest Details
          this.updateBookingInAllBookings(this.bookingDetails);
          console.log('bookingDetails', this.bookingDetails);
        });
      // this.modalReference = this.modal.open(this.modalContent, { size: 'lg' });
      this.modalReference = this.bookingModal.show();
    }
  }


  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      actions: this.actions,
      color: this.col,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }


  private updateCalendarEvents() {
    this.events = [];
    this.allBooking.forEach(element => {
      if (!element.IsDeleted) {
        this.events.push({
          id: element.Id,
          start: new Date(element.TakenFrom),
          end: new Date(element.TakenTo),
          title: element.SalesFacilities.Description + ' - ' + element.SalesFacilities.Name + ' - ' + element.SalesReason.Name + ' (' + element.StatusText + ')',
          color: colors.red,
          actions: this.actions,
          resizable: {
            beforeStart: true,
            afterEnd: true
          }
        });
      }
      this.refresh.next();
    });
  }


  private updateBookingInAllBookings(bookingToUpdate: any) {
    this.allBooking.forEach((booking, i) => {
      if (booking.Id === bookingToUpdate.Id) {
        this.allBooking[i] = bookingToUpdate;
        this.updateCalendarEvents();
      }
    });
  }


  ngOnInit() {
  }

  DeleteBooking(Booking) {
    const sweetOptions = {
      title: 'Are You Sure?',
      text: "You won't be able to revert this !",
      type: 'Warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    };

    Swal(sweetOptions)
      .then(() => {
        this.facilityService.deleteBookingRequest(Booking.Id)
          .subscribe((response: any) => {
            Booking = response;
            this.updateBookingInAllBookings(response);
            Swal({
              title: 'Booking request deleted'
            });
            this.modalReference.close();
          });
        Booking.StatusText = 'Deleted';
        this.activeDayIsOpen = false;
        this.updateCalendarEvents();
      })
      .catch(() => console.log('Canceled'));
  }

  NewBooking() {
    this.isRunning = true;
    console.log(this.newBooking);
    this.facilityService.postFacilities(
      this.newBooking.takenFrom,
      this.newBooking.takenTo,
      this.newBooking.facilities,
      this.newBooking.bookingtype,
      this.newBooking.reason,
      this.newBooking.customertype,
      this.newBooking.remarks)
      .subscribe(
        response => {
          this.newBooking = response;
          this.allBooking.push(response);
          this.updateCalendarEvents();
          // this.events.push({
          //   id: this.newBooking.Id,
          //   start: new Date(this.newBooking.TakenFrom),
          //   end: new Date(this.newBooking.TakenTo),
          //   title: this.newBooking.SalesFacilities.Description + ' - ' + this.newBooking.SalesFacilities.Name + ' ' + ' (' + this.newBooking.StatusText + ')',
          //   color: colors.red,
          //   resizable: {
          //     beforeStart: true,
          //     afterEnd: true
          //   }
          // });
          this.isRunning = false;
          this.refresh.next();
          this.yoda.showSuccess('', 'Request Booked');
        },
        // tslint:disable-next-line:no-shadowed-variable
        (error: any) => {
          // console.log(error);
          this.yoda.showError(error);
        }); this.isRunning = false;
  }

}
