import { Injectable } from '@angular/core';
import { YodaService } from '../../../../../services/yoda.service';

declare var Swal: any;


@Injectable()
export class DutyRosterBaseService {
    data: any;

    constructor(private yoda: YodaService) {
    }

    showGtsMsgBox(title, text, time) {
        Swal({
            title: title,
            text: text,
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: time,
        });
    }

    showCreateNewMsgBox(title, text, time) {
        Swal({
            title: title,
            text: text,
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: time,
        });
    }


    // **************************************************************************
    // DutyRoster App Functions
    // **************************************************************************

    // POST DutyRoster/ShiftGroups/New
    postShiftGroupsNew(DataBody) {
        return this.yoda.post('DutyRoster/ShiftGroups/New', DataBody);
    }

    // POST DutyRoster/ShiftGroups/All
    postShiftGroupsAll(DataBody) {
        // return this.yoda.postRequest('DutyRoster/ShiftGroups/All', DataBody);
        return this.yoda.post('DutyRoster/ShiftGroups/All', DataBody);
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}
    getShiftGroupById(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id);
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Delete
    deleteShiftGroupById(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id + '/Delete');
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Restore
    restoreShiftGroupById(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id + '/Restore');
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Employees
    getShiftGroupEmployeesByShiftGroupId(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id + '/Employees');
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/Supervisors
    getShiftGroupSupervisorsByShiftGroupId(Id) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + Id + '/Supervisors');
    }

    // POST DutyRoster/ShiftGroups/AssignedToSupervisor
    postShiftGroupsAssignedToSupervisor(DataBody) {
        return this.yoda.post('DutyRoster/ShiftGroups/AssignedToSupervisor', DataBody);
    }

    // GET DutyRoster/ShiftGroups/AssignedToMe
    getShiftGroupsAssignedToMe() {
        return this.yoda.get('DutyRoster/ShiftGroups/AssignedToMe');
    }





    // POST DutyRoster/ShiftsSupervisor/New
    postShiftsSupervisorNew(DataBody) {
        return this.yoda.post('DutyRoster/ShiftsSupervisor/New', DataBody);
    }

    // GET DutyRoster/ShiftsSupervisor/{ShiftsSupervisorId}/Remove
    deleteShiftsSupervisorById(Id) {
        return this.yoda.get('DutyRoster/ShiftsSupervisor/' + Id + '/Remove');
    }

    // GET DutyRoster/ShiftsSupervisor/{ShiftsSupervisorId}/Restore
    restoreShiftsSupervisorById(Id) {
        return this.yoda.get('DutyRoster/ShiftsSupervisor/' + Id + '/Restore');
    }

    // GET DutyRoster/ShiftsSupervisor/{ShiftSupervisorId}
    getShiftsSupervisorByShiftSupervisorId(Id) {
        return this.yoda.get('DutyRoster/ShiftsSupervisor/' + Id);
    }

    // POST DutyRoster/ShiftEmployees/New
    postShiftEmployeeNew(DataBody) {
        return this.yoda.post('DutyRoster/ShiftEmployees/New', DataBody);
    }

    // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}
    getShiftEmployeesByShiftEmployeeId(Id) {
        return this.yoda.get('DutyRoster/ShiftEmployees/' + Id);
    }

    // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}/Remove
    deleteShiftEmployeesById(Id) {
        return this.yoda.get('DutyRoster/ShiftEmployees/' + Id + '/Remove');
    }

    // GET DutyRoster/ShiftEmployees/{ShiftEmployeeId}/Restore
    restoreShiftEmployeesById(Id) {
        return this.yoda.get('DutyRoster/ShiftEmployees/' + Id + '/Restore');
    }

    // POST DutyRoster/WeeklyShift/GenerateForYear
    postGenerateYearForWeeklyShift(DataBody) {
        return this.yoda.post('DutyRoster/WeeklyShift/GenerateForYear', DataBody);
    }

    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}
    getWeeklyShiftByWeeklyShiftId(Id) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + Id);
    }


    // GET DutyRoster/WeeklyShift/ShiftTemplate/Update
    getWeeklyShiftUpdateShiftTemplate(DataBody) {
        return this.yoda.post('DutyRoster/WeeklyShift/ShiftTemplate/Update', DataBody);
    }

    // POST DutyRoster/WeeklyShift/All
    postWeeklyShiftAll(DataBody) {
        return this.yoda.post('DutyRoster/WeeklyShift/All', DataBody);
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/Years
    getWeeklyShiftYearsByShiftGroupId(ShiftGroupId) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/Years');
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/ForYear/{Year}
    getWeeklyShiftsForYearsByShiftGroupId(ShiftGroupId, Year) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/ForYear/' + Year);
    }

    // GET DutyRoster/ShiftGroups/{ShiftGroupId}/WeeklyShift/{WeekNumber}/{Year}
    getShiftGroupsByShiftGroupId(ShiftGroupId, WeekNumber, Year) {
        return this.yoda.get('DutyRoster/ShiftGroups/' + ShiftGroupId + '/WeeklyShift/' + WeekNumber + '/' + Year);
    }




    getRollCallDetails(ShiftGroupId, WeekNumber, Year){
        return this.yoda.get('DutyRoster/ShiftGroups/' + ShiftGroupId +'/WeeklyShift/'+WeekNumber+ '/'+Year+'/RollCallDetails')
    }

    // GET DutyRoster/WeeklyShift/PendingHRRelease
    getWeeklyShiftPendingHRRelease() {
        return this.yoda.get('DutyRoster/WeeklyShift/PendingHRRelease');
    }

    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/SupervisorRelease
    getWeeklyShiftSupervisorReleaseByWeeklyShiftId(WeeklyShiftId) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/SupervisorRelease');
    }

    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/HrRelease
    getWeeklyShiftHrReleaseByWeeklyShiftId(WeeklyShiftId) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/HrRelease');
    }






    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/release
    getWeeklyShiftChangeStatusReleaseByWeeklyShiftId(WeeklyShiftId) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/ChangeStatus/release');
    }

    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/CancelledShifts
    getWeeklyShiftCancelledShiftsByWeeklyShiftId(WeeklyShiftId) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + WeeklyShiftId + '/CancelledShifts');
    }

    // GET DutyRoster/WeeklyShifts/ByWeekAndYear/{WeekNumber}/{Year}
    getWeeklyShiftsByWeekAndYear(weekNum, year) {
        return this.yoda.get('DutyRoster/WeeklyShifts/ByWeekAndYear/' + weekNum + '/' + year);
    }


    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/Open
    getWeeklyShiftChangeStatusToOpen(Id) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + Id + '/ChangeStatus/Open');
    }

    // GET DutyRoster/WeeklyShift/{WeeklyShiftId}/ChangeStatus/Close
    getWeeklyShiftChangeStatusToClose(Id) {
        return this.yoda.get('DutyRoster/WeeklyShift/' + Id + '/ChangeStatus/Close');
    }

    // POST DutyRoster/WeeklyShift/EditingIsPossible/Change
    postWeeklyShiftExtend(DataBody) {
        return this.yoda.post('DutyRoster/WeeklyShift/EditingIsPossible/Change', DataBody);
    }

    // POST DutyRoster/Shifts/New
    postShiftNew(DataBody) {
        return this.yoda.post('DutyRoster/Shifts/New', DataBody);
    }

    // GET DutyRoster/Shifts/{Id}/Remove
    getShiftRemove(Id) {
        return this.yoda.get('DutyRoster/Shifts/' + Id + '/Remove');
    }

    // POST DutyRoster/Shifts/NewOff
    postShiftNewOff(DataBody) {
        return this.yoda.post('DutyRoster/Shifts/NewOff', DataBody);
    }

    // GET api/DutyRoster?FromDate={FromDate}
    getDutyRosterFromDate(fromDate) {
        return this.yoda.get('DutyRoster/FromDate/' + fromDate);
    }

    // POST DutyRoster/OffShifts/PendingSAPUpload
    postShiftsSAPUploadPending(DataBody) {
        return this.yoda.post('DutyRoster/OffShifts/PendingSAPUpload', DataBody);
    }

    // POST DutyRoster/Shifts/MarkAsUploadToSAP
    postShiftsMarkAsUploadToSAP(DataBody) {
        return this.yoda.post('DutyRoster/Shifts/MarkAsUploadToSAP', DataBody);
    }

    // POST DutyRoster/Shifts/EmployeeWithShiftCount
    postShiftsEmployeeWithShiftCount(DataBody) {
        return this.yoda.post('DutyRoster/Shifts/EmployeeWithShiftCount', DataBody);
    }


    // GET DutyRoster/ShiftTemplates/All
    getShiftTemplatesAll() {
        return this.yoda.get('DutyRoster/ShiftTemplates/All');
    }

    // GET DutyRoster/ShiftTemplates/{ShiftTemplate_Id}
    getShiftTemplatesByShiftTemplateId(ShiftTemplateId) {
        return this.yoda.get('DutyRoster/ShiftTemplates/' + ShiftTemplateId);
    }

    // POST DutyRoster/ShiftTemplates/New
    postShiftTemplatesNew(DataBody) {
        return this.yoda.post('DutyRoster/ShiftTemplates/New', DataBody);
    }

    // POST DutyRoster/ShiftTemplates/Times/New
    postShiftTemplatesTimesNew(DataBody) {
        return this.yoda.post('DutyRoster/ShiftTemplates/Times/New', DataBody);
    }

    // POST DutyRoster/ShiftTemplates/Times/Remove
    postShiftTemplatesTimesRemove(DataBody) {
        return this.yoda.post('DutyRoster/ShiftTemplates/Times/Remove', DataBody);
    }





    // **************************************************************************
    // BaseApi Functions
    // **************************************************************************
    // GET Common/GetWeekNo?FromDate={FromDate}
    getWeekNo(fromDate) {
        return this.yoda.get('Common/GetWeekNo?FromDate=' + fromDate);
    }

    // GET Common/GetFirstWeekDay?year={year}&weekNum={weekNum}
    getFirstWeekDay(year, weekNum) {
        return this.yoda.get('Common/GetFirstWeekDay?year=' + year + '&weekNum=' + weekNum);
    }

    // GET Common/GetEndWeekDay?year={year}&weekNum={weekNum}
    getEndWeekDay(year, weekNum) {
        return this.yoda.get('Common/GetEndWeekDay?year=' + year + '&weekNum=' + weekNum);
    }

    // GET Common/GetCurrentWeekNo
    getCurrentWeekNo() {
        return this.yoda.get('Common/GetCurrentWeekNo');
    }

    // GET Common/GetCurrentWeekDetails
    getCurrentWeekDetails() {
        return this.yoda.get('Common/GetCurrentWeekDetails');
    }

    // GET Common/GetWeekDetails?year={year}&weekNum={weekNum}
    getWeekDetails(year, weekNum) {
        return this.yoda.get('Common/GetWeekDetails?year=' + year + '&weekNum=' + weekNum);
    }




    // **************************************************************************
    // Global Functions
    // **************************************************************************

    // GET My/Details
    getMyDetails() {
        return this.yoda.get('My/Details');
    }

    // GET My/Details
    getMySubordinates() {
        return this.yoda.get('My/Subordinates');
    }

    getUser(Id) {
        return this.yoda.get('/Employee/' + Id + '/Details');
    }

    getUserPictureBase64(Id) {
        return this.yoda.get('/Employee/' + Id + '/Picture/Base64');
    }

}
