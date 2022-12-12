import { Injectable } from '@angular/core';
import { YodaService } from '../../../../services/yoda.service';

@Injectable()
export class FacilityBookingBaseService {

    constructor(private yoda: YodaService) { }

    // GET Facilities
    getFacilities() {
        return this.yoda.get('Organization/Facilities');
    }

    getSalesReason() {
        return this.yoda.get('Organization/Events/SalesEvents');
    }

    getCustomerType() {
        return this.yoda.get('Organization/Customer/CustomerTypes');
    }

    getBookingType() {
        return this.yoda.get('Organization/Booking/BookingTypes');
    }

    // Create a new Booking
    postFacilities(takenFrom, takenTo, facilities_Id, bookingType_Id, salesReason_Id, salesCustomerType_Id, remarks) {
        var postData = {
            'TakenFrom': takenFrom,
            'TakenTo': takenTo,
            'Facilities_Id': facilities_Id,
            'BookingType_Id': bookingType_Id,
            'SalesReason_Id': salesReason_Id,
            'SalesCustomerType_Id': salesCustomerType_Id,
            'Remarks': remarks
        };
        return this.yoda.post('Organization/Booking/NewSalesBooking', postData);
    }

    // GETALLBOOKINGS
    getAllBookings() {
        return this.yoda.get('Organization/Booking/AllBookings');
    }

    deleteBookingRequest(bookingId) {
        return this.yoda.get('Organization/Booking/' + bookingId + '/IsDeleted')
    }

}
