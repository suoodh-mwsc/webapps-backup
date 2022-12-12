import { Injectable } from '@angular/core';
import { Adal5Service } from 'adal-angular5';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { YodaService } from '../../../../services/yoda.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

declare var Swal: any;

@Injectable()
export class NfcGuardPatrolBaseService {

    data: any;
    // results: any;
    private swal: any;
    private apiAddress: any;

    constructor(private adalService: Adal5Service, private http: HttpClient, private yoda: YodaService) { }

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




    // ************************************************************************************************************************************
    // Security App Functions
    // ************************************************************************************************************************************

    // PatrollingGroup ==============================================================================
    // POST - Patrolling/PatrollingGroup/New
    postPatrollingGroupNew(DataBody) {
        return this.yoda.post('Patrolling/PatrollingGroup/New', DataBody);
    }

    // POST Patrolling/PatrollingGroup/AssignedToSupervisor
    postPatrollingGroupAssignedToSupervisor(DataBody) {
        return this.yoda.post('Patrolling/PatrollingGroup/AssignedToSupervisor', DataBody);
    }

    // GET Patrolling/PatrollingGroup/{PatrollingGroup_Id}/Restore
    getPatrollingGroupRestoreById(PatrollingGroupId) {
        return this.yoda.get('Patrolling/PatrollingGroup/' + PatrollingGroupId + '/Restore');
    }

    // GET Patrolling/PatrollingGroup/{PatrollingGroup_Id}/Delete
    getPatrollingGroupDeleteById(PatrollingGroupId) {
        return this.yoda.get('Patrolling/PatrollingGroup/' + PatrollingGroupId + '/Delete');
    }

    // GET Patrolling/PatrollingGroup/ById/{PatrollingGroup_Id}
    getPatrollingGroupById(PatrollingGroupId) {
        return this.yoda.get('Patrolling/PatrollingGroup/ById/' + PatrollingGroupId);
    }

    // GET Patrolling/PatrollingGroup/AssignedToMe
    getPatrollingGroupAssignedToMe(DataBody) {
        return this.yoda.get('Patrolling/PatrollingGroup/AssignedToMe', DataBody);
    }

    // POST Patrolling/PatrollingGroup/All
    // Only ICT Access
    postPatrollingGroupAll(DataBody) {
        return this.yoda.post('Patrolling/PatrollingGroup/All', DataBody);
    }



    // PatrollingSupervisor =========================================================================
    // POST Patrolling/PatrollingSupervisor/New
    postPatrollingSupervisorNew(DataBody) {
        return this.yoda.post('Patrolling/PatrollingSupervisor/New', DataBody);
    }

    // GET Patrolling/PatrollingSupervisor/{PatrollingSupervisor_Id}/Remove
    getPatrollingSupervisorDeleteById(PatrollingSupervisorId) {
        return this.yoda.get('Patrolling/PatrollingSupervisor/' + PatrollingSupervisorId + '/Remove');
    }

    // GET Patrolling/PatrollingSupervisor/{PatrollingSupervisor_Id}/Restore
    getPatrollingSupervisorRestoreById(PatrollingSupervisorId) {
        return this.yoda.get('Patrolling/PatrollingSupervisor/' + PatrollingSupervisorId + '/Restore');
    }

    // GET Organization/SecuritySupervisor/{SecuritySupervisor_Id}
    // getPatrollingSupervisorById(SecuritySupervisorId) {
    //     return this.yoda.get('Patrolling/PatrollingSupervisor/' + SecuritySupervisorId);
    // }



    // PatrollingEmployee ===============================================================================
    // POST Patrolling/PatrollingEmployee/New
    postPatrollingEmployeeNew(DataBody) {
        return this.yoda.post('Patrolling/PatrollingEmployee/New', DataBody);
    }

    // GET Patrolling/PatrollingEmployee/{PatrollingEmployee_Id}/Remove
    getPatrollingEmployeeDeleteById(PatrollingEmployeeId) {
        return this.yoda.get('Patrolling/PatrollingEmployee/' + PatrollingEmployeeId + '/Remove');
    }

    // GET Patrolling/PatrollingEmployee/{PatrollingEmployee_Id}/Restore
    getPatrollingEmployeeRestoreById(PatrollingEmployeeId) {
        return this.yoda.get('Patrolling/PatrollingEmployee/' + PatrollingEmployeeId + '/Restore');
    }

    // GET Patrolling/PatrollingEmployees
    getPatrollingEmployeeAll() {
        return this.yoda.get('Patrolling/PatrollingEmployees');
    }

    // GET Organization/SecurityEmployee/{SecuritySEmployee_Id}
    // getPatrollingSEmployeeById(SecurityEmployeeId) {
    //     return this.yoda.get('Patrolling/PatrollingEmployee/' + SecurityEmployeeId);
    // }


    // PatrollingRoute ==============================================================================
    // POST Patrolling/PatrollingRoute/New
    postPatrollingRoutes(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRoute/New', DataBody);
    }

    // PUT Patrolling/PatrollingRoute/Edit
    putPatrollingRoutes(DataBody) {
        return this.yoda.put('Patrolling/PatrollingRoute/Edit', DataBody);
    }

    // POST Patrolling/PatrollingRoute/ChangeRouteIsActive
    postPatrollingRouteChangeIsActive(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRoute/ChangeRouteIsActive', DataBody);
    }

    // GET Patrolling/PatrollingRoute/All
    getPatrollingRoutesAll() {
        return this.yoda.get('Patrolling/PatrollingRoute/All');
    }

    // GET Patrolling/PatrollingRoute/{Route_Id}
    getPatrollingRoutesById(RouteId) {
        return this.yoda.get('Patrolling/PatrollingRoute/' + RouteId);
    }

    // GET Patrolling/PatrollingRoute/{Route_Id}/PatrollingTags
    getPatrollingTagsByRouteId(RouteId) {
        return this.yoda.get('Patrolling/PatrollingRoute/' + RouteId + '/PatrollingTags');
    }



    // PatrollingTags ======================================================================================================

    // POST Patrolling/PatrollingTags/New
    postPatrollingTags(DataBody) {
        return this.yoda.post('Patrolling/PatrollingTags/New', DataBody);
    }

    // PUT Patrolling/PatrollingTags/Edit
    putPatrollingTags(DataBody) {
        return this.yoda.put('Patrolling/PatrollingTags/Edit', DataBody);
    }

    // POST Patrolling/PatrollingTags/ChangeTagIsActive
    postPatrollingTagChangeIsActive(DataBody) {
        return this.yoda.post('Patrolling/PatrollingTags/ChangeTagIsActive', DataBody);
    }

    // GET  Patrolling/PatrollingTags/{TaskId}/PatrollingTask
    getPatrollingTasksByTagId(TagId) {
        return this.yoda.get('Patrolling/PatrollingTags/' + TagId + '/PatrollingTask');
    }



    // PatrollingTasks =====================================================================================================
    // POST Patrolling/PatrollingTasks/New
    postPatrollingTasks(DataBody) {
        return this.yoda.post('Patrolling/PatrollingTasks/New', DataBody);
    }

    // PUT Patrolling/PatrollingTasks/Edit
    putPatrollingTasks(DataBody) {
        return this.yoda.put('Patrolling/PatrollingTasks/Edit', DataBody);
    }

    // POST Patrolling/PatrollingTasks/ChangeTaskIsActive
    postPatrollingTaskChangeIsActive(DataBody) {
        return this.yoda.post('Patrolling/PatrollingTasks/ChangeTaskIsActive', DataBody);
    }

    // POST Patrolling/PatrollingTasks/TaskType/Change
    postPatrollingTaskChangeIsType(DataBody) {
        return this.yoda.post('Patrolling/PatrollingTasks/TaskType/Change', DataBody);
    }



    // SecurityRoutesAssigned ============================================================================================
    // POST Patrolling/PatrollingRoutesAssigned/FilterByDate
    postPatrollingRouteAssignFilterByDates(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRoutesAssigned/FilterByDate', DataBody);
    }

    // POST Patrolling/PatrollingRoute/Assign
    postPatrollingRouteAssign(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRoute/Assign', DataBody);
    }

    // POST Patrolling/PatrollingRouteAssign/Bulk
    postPatrollingRouteAssignBulk(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRouteAssign/Bulk', DataBody);
    }

    // POST Patrolling/PatrollingRoutesAssigned/FilterByDate/v2
    getPatrollingRouteAssignOverview(DataBody) {
        return this.yoda.post('Patrolling/PatrollingRoutesAssigned/FilterByDate/v2', DataBody);
    }

    // ************************************************************************************************************************************
    // Global Functions
    // ************************************************************************************************************************************

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
