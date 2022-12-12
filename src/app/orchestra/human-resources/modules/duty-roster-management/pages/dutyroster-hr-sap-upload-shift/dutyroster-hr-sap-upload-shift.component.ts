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
  selector: 'app-dutyroster-hr-sap-upload-shift',
  templateUrl: './dutyroster-hr-sap-upload-shift.component.html',
  styleUrls: ['./dutyroster-hr-sap-upload-shift.component.scss']
})
export class DutyrosterHrSapUploadShiftComponent implements OnInit {

  showLoader: boolean;
  selectedData: any = [];

  // tslint:disable-next-line:no-inferrable-types
  private selectSAPuploadsAll: boolean = false;

  sapuploadDataSelected: any = [];
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

  // 'Employee Number', 'Period', 'Start Date', 'End Date', 'Infotype', 'Total Shift Count', 'Normal Shift Rate at'

  constructor(
    private dutyRosterBase: DutyRosterBaseService
  ) {
    const today = new Date();
    // this.getAllSAPUploadPending(1);
    this.selectedData.infotype = '9010';
    this.selectedData.shiftRate = '90';
    this.selectedData.period = 'X';
  }


  ngOnInit() {
  }


  getAllSAPUploadPending(selectedData) {
    this.showLoader = true;
    this.sapuploads = [];
    this.dutyRosterBase.postShiftsEmployeeWithShiftCount(
      {
        'From': selectedData.fromDate,
        'To': selectedData.toDate
      }
    ).subscribe((data: any) => {
      this.showLoader = false;
      console.log('getAllSAPUploadPending data', data);
      // this.sapuploadsPaginationInfo = data.PaginationInfo;
      var selectedDatafromDate = moment(this.selectedData.fromDate).format('DD.MM.YYYY');
      var selectedDatatoDate = moment(this.selectedData.toDate).format('DD.MM.YYYY');
      data.forEach(elemt => {
        const sapuploadsData = {
          EmployeeId: elemt.EmployeeId,
          Period: this.selectedData.period,
          StartDate: selectedDatafromDate,
          EndDate: selectedDatatoDate,
          Infotype: this.selectedData.infotype,
          ShiftCount: elemt.ShiftCount,
          NormalShiftRateAt: this.selectedData.shiftRate,
          Selected: false,
        };
        this.sapuploads.push(sapuploadsData);
      });
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
          const reportTitle = new String('HR_Shift_SAP_Upload_Data_');
          const title = reportTitle.concat(this.nowDateTime);
          console.log('ReportTitleWithDate :', title);

          const options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalseparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'HR Shift SAP Upload Data',
            // useBom: true,
            // noDownload: true,
            headers: ['Employee Number', 'Period', 'Start Date', 'End Date', 'Infotype', 'Total Shift Count', 'Normal Shift Rate at']
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
        if (result.value) {
          let i = 0;
          const max = this.shiftIdsArray.length;

          for (i = 0; i <= max; i++) {
            this.dutyRosterBase.postShiftsMarkAsUploadToSAP(
              {
                'Shift_Ids': [this.shiftIds[i]]
              }
            ).subscribe(data => {
              // console.log('Hooray!', 'Uploaded SAP Data Successfully', data);
            });
          }

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
          var selectedDatafromDate = moment(this.selectedData.fromDate).format('DD.MM.YYYY');
          var selectedDatatoDate = moment(this.selectedData.toDate).format('DD.MM.YYYY');
          const sapuploadsExport = {
            EmployeeId: elemt.EmployeeId,
            Period: this.selectedData.period,
            StartDate: selectedDatafromDate,
            EndDate: selectedDatatoDate,
            Infotype: this.selectedData.infotype,
            ShiftCount: elemt.ShiftCount,
            NormalShiftRateAt: this.selectedData.shiftRate
            // Selected: false,
          };

          const shift_Ids = {
            Shift_Ids: elemt.ShiftId,
          };
          this.sapuploadsExport.push(sapuploadsExport);
          this.shiftIdsArray.push(shift_Ids);
          this.shiftIds.push(elemt.ShiftId);
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
    console.log('updateSelected', sapuploadData);
    if (event.target.checked) {
      // tslint:disable-next-line:no-unused-expression
      sapuploadData.Selected = true;
      if (sapuploadData.Selected === true) {
        const sapuploadsExport = {
          EmployeeId: sapuploadData.EmployeeId, Period: sapuploadData.Period,
          StartDate: sapuploadData.StartDate, EndDate: sapuploadData.EndDate,
          Infotype: sapuploadData.Infotype, ShiftCount: sapuploadData.ShiftCount,
          NormalShiftRateAt: sapuploadData.NormalShiftRateAt
        };
        this.sapuploadsExport.push(sapuploadsExport);
        // this.shiftIdsArray.push(shift_Ids);
        // this.shiftIds.push(elemt.ShiftId);
      }

      console.log('updateSelected event.target.checked', this.sapuploadsExport);
    } else {
      // tslint:disable-next-line:no-unused-expression
      sapuploadData.Selected = false;
      console.log('updateSelected event.target.checked else', sapuploadData);
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



  // getAllSAPUploadPendingx(pageSize, pageNum) {
  //   // this.sapuploads = null;
  //   this.dutyRosterBase.postShiftsSAPUploadPending(
  //     {
  //       // "TakenOn": "2018-12-27T11:05:57.7793541+05:00",
  //       'PageSize': pageSize,
  //       'PageNumber': pageNum
  //     }
  //   ).subscribe((data: any) => {
  //     // console.log('getAllSAPUploadPending data', data);
  //     this.sapuploadsPaginationInfo = data.PaginationInfo;
  //     data.Result.forEach(elemt => {
  //       // tslint:disable-next-line:max-line-length
  //       const sapuploadsData = {
  //         EmployeeId: elemt.EmployeeId,
  //         AbsenceTypeId: elemt.AttendanceType,
  //         Start: elemt.StartTime, // Time
  //         End: elemt.EndTime,
  //         From: elemt.StartDate, // Date
  //         To: elemt.EndDate,
  //         ShiftId: elemt.Shift.Id,
  //         ShiftEmployee_Id: elemt.EmployeeId,
  //         WeeklyShift_Id: elemt.Shift.WeeklyShift_Id,
  //         UploadedToSAPOn: elemt.Shift.UploadedToSAPOn,
  //         Selected: false,
  //       };
  //       // tslint:disable-next-line:max-line-length
  //       const sapuploadsExport = {
  //         EmployeeId: elemt.EmployeeId,
  //         AbsenceTypeId: elemt.AttendanceType,
  //         Start: elemt.StartTime, // Time
  //         End: elemt.EndTime,
  //         From: elemt.StartDate, // Date
  //         To: elemt.EndDate,
  //       };
  //       const shift_Ids = {
  //         Shift_Ids: elemt.Shift.Id,
  //       };
  //       this.sapuploads.push(sapuploadsData);
  //       this.sapuploadsExport.push(sapuploadsExport);
  //       this.shiftIdsArray.push(shift_Ids);
  //       this.shiftIds.push(elemt.Shift.Id);
  //     });
  //     // console.log('getAllSAPUploadPending - sapuploads Pagination ->', this.sapuploadsPaginationInfo);
  //     // console.log('getAllSAPUploadPending - sapuploads Data ->', this.sapuploads);
  //     // console.log('getAllSAPUploadPending - shiftIds Data ->', this.shiftIds);
  //   });
  // }


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
