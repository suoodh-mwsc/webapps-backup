import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-online-application-user',
  templateUrl: './online-application-user.component.html',
  styleUrls: ['./online-application-user.component.scss']
})
export class OnlineApplicationUserComponent implements OnInit {

  searchResult = [];

  constructor() {

    this.searchResult = [
      { RequestId: '1001', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      { RequestId: '1002', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      { RequestId: '1003', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      { RequestId: '1004', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      { RequestId: '1005', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1006', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1007', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1008', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1009', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1010', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1011', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
      // { RequestId: '1012', RequestedDate: '2019-11-21T00:00:00', RequestedUser: 'some@mail.com', Status: 'Pending', IsDeleted: 'false', Remarks: '' },
    ];
  }

  ngOnInit() {
  }

}
