import { Component, OnInit } from '@angular/core';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DutyRosterBaseService } from './../../services/duty-roster-base.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';

declare var Swal: any;

@Component({
  selector: 'app-dutyroster-hr-sap-upload-offshift',
  templateUrl: './dutyroster-hr-sap-upload-offshift.component.html',
  styleUrls: ['./dutyroster-hr-sap-upload-offshift.component.scss']
})
export class DutyrosterHrSapUploadOffshiftComponent implements OnInit {

  showLoader: boolean;
  selectedDate: any;

  // tslint:disable-next-line:no-inferrable-types
  private selectSAPuploadsAll: boolean = false;
  allSapuploads: any = [];
  sapuploads: any = [];
  sapuploadsExport = [];
  sapuploadsPaginationInfo: any;
  shiftIds = [];
  shiftIdsArray = [];
  nowDateTime: any; // Rename Export Data


  tempFilterArray: any = [];

  tblheaders = [
    { id: 1, title: 'EmployeeId' },
    { id: 2, title: 'AbsenceTypeId' },
    { id: 3, title: 'Start' },
    { id: 4, title: 'End' },
    { id: 5, title: 'From' },
    { id: 6, title: 'To' }
  ];

  constructor(
    private dutyRosterBase: DutyRosterBaseService
  ) {
    // this.getAllSAPUploadPending(300, 1);
    const today = new Date();
    // this.getAllSAPUploadPendingWithDate(today ,10);
    this.allSapuploads.PageNumber = 1;
    this.getAllSAPUploadPending(1);
  }


  ngOnInit() {
  }


  getAllSAPUploadPendingWithDate(selectedDate, pageNum) {
    this.showLoader = true;
    console.log('getAllSAPUploadPending data -> Show More');
    // this.sapuploads = [];
    const pageSize = 10;
    // let pageNum = 1;
    this.allSapuploads.PageSize = pageSize;
    this.allSapuploads.PageNumber = pageNum;
    console.log('getAllSAPUploadPendingWithDate ->', selectedDate);
    console.log('getAllSAPUploadPendingWithDate ->', pageNum);
    this.dutyRosterBase.postShiftsSAPUploadPending(
      {
        'TakenOn': selectedDate,
        'PageSize': pageSize,
        'PageNumber': pageNum
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getAllSAPUploadPending data', data);
      this.sapuploadsPaginationInfo = data.PaginationInfo;

      data.Result.forEach(elemt => {
        // tslint:disable-next-line:max-line-length
        const sapuploadsData = {
          EmployeeId: elemt.EmployeeId,
          AbsenceTypeId: elemt.AttendanceType,
          Start: '', // Time
          End: '',
          From: elemt.StartDate, // Date
          To: elemt.EndDate,
          ShiftId: elemt.Shift.Id,
          ShiftEmployee_Id: elemt.EmployeeId,
          WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
          UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
          Selected: false,
        };
        this.sapuploads.push(sapuploadsData);
      });

      this.tempFilterArray = this.sapuploads.filter(sapuploads => sapuploads.ShiftId === this.sapuploads.ShiftId);
      console.log('getAllSAPUploadPendingWithDate tempFilterArray', this.tempFilterArray);
      this.sapuploads.concat(this.tempFilterArray);
      console.log('getAllSAPUploadPendingWithDate sapuploads', this.sapuploads);
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });

  }


  getAllSAPUploadPending(pageNum) {
    this.showLoader = true;
    this.sapuploads = [];
    const pageSize = 10;
    this.allSapuploads.PageNumber = pageNum;
    this.dutyRosterBase.postShiftsSAPUploadPending(
      {
        // "TakenOn": "2018-12-27T11:05:57.7793541+05:00",
        'PageSize': pageSize,
        'PageNumber': pageNum,
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getAllSAPUploadPending data', data);
      this.sapuploadsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(elemt => {
        // tslint:disable-next-line:max-line-length
        const sapuploadsData = {
          EmployeeId: elemt.EmployeeId,
          AbsenceTypeId: elemt.AttendanceType,
          Start: '', // Time
          End: '',
          From: elemt.StartDate, // Date
          To: elemt.EndDate,
          ShiftId: elemt.Shift.Id,
          ShiftEmployee_Id: elemt.EmployeeId,
          WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
          UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
          Selected: false,
        };
        this.sapuploads.push(sapuploadsData);
      });
      this.tempFilterArray = this.sapuploads.filter(sapuploads => sapuploads.ShiftId === this.sapuploads.ShiftId);
      console.log('getAllSAPUploadPendingWithDate tempFilterArray', this.tempFilterArray);
      this.sapuploads.concat(this.tempFilterArray);
      console.log('getAllSAPUploadPendingWithDate sapuploads', this.sapuploads);
    }, (error: Response | any) => {
      this.showLoader = false;
      return Observable.throw(new Error(error.status));
    });
  }





  download() {
    if (this.sapuploadsExport.length > 0) {
      Swal({
        title: 'Export DutyRoster Data?',
        text: 'Do you want export DutyRoster Data?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        // closeOnConfirm: true,
        // closeOnCancel: true,
        reverseButtons: true
      }).then((result) => {
        if (result.value) {
          this.nowDateTime = moment().format('YYYY-MM-DD_HH-mm-ss');
          // tslint:disable-next-line:no-construct
          const reportTitle = new String('HR_OffShift_SAP_Upload_Data_');
          const title = reportTitle.concat(this.nowDateTime);
          console.log('ReportTitleWithDate :', title);

          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'HR OffShift SAP Upload Data',
            // useBom: true,
            // noDownload: true,
            headers: ['EmployeeId', 'AbsenceTypeId', 'Start', 'End', 'From', 'To']
          };
          // tslint:disable-next-line:no-unused-expression
          new Angular5Csv(this.sapuploadsExport, title, options);
          console.log('Upload Data', this.sapuploadsExport);
          Swal('Hooray!', 'Export DutyRoster Data Successfully. :)', 'success');
          // console.log('Export DutyRoster Data Successfully');
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal('Cancelled!', 'Request Cancelled. :(', 'error');
          // console.log('Cancel Request');
        }
      });
    } else {
      Swal('Cancelled!', 'No Data Found. :(', 'error');
      // console.log('Cancel Request -> No Data Found');
    }
  }



  getShiftsSAPBulkUpload() {
    if (this.sapuploadsExport.length > 0) {
      Swal({
        title: 'Upload DutyRoster Data to SAP?',
        text: 'Do you want Upload DutyRoster Data to SAP?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        // closeOnConfirm: true,
        // closeOnCancel: true,
        reverseButtons: true
      }).then((result) => {
        console.log('getShiftsSAPBulkUpload - shiftIdsArray', this.shiftIdsArray);
        console.log('getShiftsSAPBulkUpload - shiftIdsArray', this.shiftIds);
        if (result.value) {
          let i = 0;
          const max = this.shiftIdsArray.length;

          for (i = 0; i <= max; i++) {
            console.log('getShiftsSAPBulkUpload', this.shiftIds[i]);
            this.dutyRosterBase.postShiftsMarkAsUploadToSAP(
              {
                'Shift_Ids': this.shiftIds
              }
            ).subscribe((data: any) => {
              console.log('Hooray!', 'Uploaded SAP Data Successfully', data);
            },
              (error: Response | any) => {
                return Observable.throw(new Error(error.status));
              });
          }

          this.getAllSAPUploadPending(1);
          this.sapuploadsExport = [];
          this.shiftIds = [];
          this.shiftIdsArray = [];
          this.selectSAPuploadsAll = false;
          Swal('Hooray!', 'Uploaded SAP Data Successfully. :)', 'success');
          // console.log('Uploaded SAP Data Successfully');
        } else if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal('Cancelled!', 'Request Cancelled. :(', 'error');
          // console.log('Cancel Request');
        }
      });
    } else {
      Swal('Cancelled!', 'No Data Found. :(', 'error');
      // console.log('Cancel Request -> No Data Found');
    }
  }




  updateSelectedAll(event: any) {
    if (event.target.checked) {
      this.sapuploadsExport = [];
      this.shiftIds = [];
      this.shiftIdsArray = [];
      if (this.selectSAPuploadsAll = true) {
        this.sapuploads.forEach(elemt => {
          // tslint:disable-next-line:max-line-length
          const sapuploadsExport = {
            EmployeeId: elemt.EmployeeId, AbsenceTypeId: elemt.AbsenceTypeId,
            Start: '', End: '', // Time
            From: elemt.From, To: elemt.To,     // Date
          };
          const shift_Ids = {
            Shift_Ids: Number(elemt.ShiftId),
          };
          this.sapuploadsExport.push(sapuploadsExport);
          this.shiftIdsArray.push(shift_Ids);
          this.shiftIds.push(Number(elemt.ShiftId));
        });
        this.selectSAPuploadsAll = true;
      } else {
        // console.log("unchecked");
      }
    } else {
      this.sapuploadsExport = [];
      this.shiftIds = [];
      this.shiftIdsArray = [];
      this.selectSAPuploadsAll = false;
    }
  }

  updateSelected(sapuploadData, event: any) {
    if (event.target.checked) {
      this.sapuploads.forEach(elemt => {
        if (sapuploadData.ShiftId === elemt.ShiftId) {
          // tslint:disable-next-line:max-line-length
          const sapuploadsExport = {
            EmployeeId: elemt.EmployeeId, AbsenceTypeId: elemt.AbsenceTypeId,
            // Start: elemt.Start, End: elemt.End, // Time
            Start: '', End: '', // Time
            From: elemt.From, To: elemt.To,     // Date
          };
          const shift_Ids = {
            Shift_Ids: elemt.ShiftId,
          };
          this.sapuploadsExport.push(sapuploadsExport);
          this.shiftIdsArray.push(shift_Ids);
          this.shiftIds.push(elemt.ShiftId);
        }
      });
      console.log('sapuploadData', sapuploadData);
    } else {
      this.sapuploadsExport.forEach(sapuploadsExportItem => {
        if (sapuploadData.ShiftId === sapuploadsExportItem.ShiftId) {
          const removeSapuploadsExportItem = this.sapuploadsExport.indexOf(sapuploadsExportItem);
          this.sapuploadsExport.splice(removeSapuploadsExportItem, 1);
          // console.log('removeSelected - sapuploadsExport Data ->', this.sapuploadsExport);
        }
      });

      this.shiftIdsArray.forEach(shiftIdsArrayItem => {
        if (sapuploadData.ShiftId === shiftIdsArrayItem.ShiftId) {
          const removeShiftIdsArrayItem = this.shiftIdsArray.indexOf(shiftIdsArrayItem);
          this.shiftIdsArray.splice(removeShiftIdsArrayItem, 1);
          // console.log('removeSelected - shiftIdsArray Data ->', this.shiftIdsArray);
        }
      });

      const removeIndex = this.shiftIds.indexOf(sapuploadData.ShiftId);
      this.shiftIds.splice(removeIndex, 1);
      // console.log('removeSelected - shiftIds Data ->', this.shiftIds);
    }
  }



  getAllSAPUploadPendingx(pageSize, pageNum) {
    // this.sapuploads = null;
    this.dutyRosterBase.postShiftsSAPUploadPending(
      {
        // "TakenOn": "2018-12-27T11:05:57.7793541+05:00",
        'PageSize': pageSize,
        'PageNumber': pageNum
      }
    ).subscribe((data: any) => {
      // console.log('getAllSAPUploadPending data', data);
      this.sapuploadsPaginationInfo = data.PaginationInfo;
      data.Result.forEach(elemt => {
        // tslint:disable-next-line:max-line-length
        const sapuploadsData = {
          EmployeeId: elemt.EmployeeId,
          AbsenceTypeId: elemt.AttendanceType,
          Start: '', // Time
          End: '',
          From: elemt.StartDate, // Date
          To: elemt.EndDate,
          ShiftId: elemt.Shift.Id,
          ShiftEmployee_Id: elemt.EmployeeId,
          WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
          UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
          Selected: false,
        };
        // tslint:disable-next-line:max-line-length
        const sapuploadsExport = {
          EmployeeId: elemt.EmployeeId,
          AbsenceTypeId: elemt.AttendanceType,
          Start: '', // Time
          End: '',
          From: elemt.StartDate, // Date
          To: elemt.EndDate,
        };
        const shift_Ids = {
          Shift_Ids: elemt.Shift.Id,
        };
        this.sapuploads.push(sapuploadsData);
        this.sapuploadsExport.push(sapuploadsExport);
        this.shiftIdsArray.push(shift_Ids);
        this.shiftIds.push(elemt.Shift.Id);
      });
      console.log('getAllSAPUploadPending - sapuploads Pagination ->', this.sapuploadsPaginationInfo);
      console.log('getAllSAPUploadPending - sapuploads Data ->', this.sapuploads);
      console.log('getAllSAPUploadPending - shiftIds Data ->', this.shiftIds);
    });
  }


  updateSelectedWithConfirmation(sapuploadData, event: any) {
    if (event.target.checked) {
      // console.log("checked");
      Swal({
        title: 'Select Duty for SAP Upload?',
        text: 'Select Duty for SAP Upload?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#138a9c',
        confirmButtonText: 'Request Confirmed!',
        cancelButtonText: 'Cancel Request!',
        // closeOnConfirm: true,
        // closeOnCancel: true,
        reverseButtons: true
      })

        .then((result) => {
          if (result.value) {
            Swal('Hooray!', 'Request Confirmed. :)', 'success');
            // console.log('Request Confirmed');
          } else if (
            // Read more about handling dismissals
            result.dismiss === Swal.DismissReason.cancel
          ) {
            Swal('Cancelled!', 'Request Cancelled. :(', 'error');
            // console.log('Cancel Request');
          }
        });
    } else {
      // console.log('unchecked');
    }
  }


  functionWithConfirm(sapuploadData, event: any) {
    Swal({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        Swal('Deleted!', 'Your file has been deleted.', 'success');
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

}
