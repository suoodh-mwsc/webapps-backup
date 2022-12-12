import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sadbox',
  templateUrl: './sadbox.component.html',
  styleUrls: ['./sadbox.component.scss']
})
export class SadboxComponent implements OnInit {

  payload: any[];
  arrayDatas = new Array<SampleDataType>();

  constructor() {
    this.payload = []
    this.test();

    this.loadDatas();
  }

  ngOnInit() {
  }


  loadDatas() {
    this.arrayDatas.push({ name: "Male", isoCode: 1, icon:'fa fa-wrench', bgcolor: 'fb9667', color: 'fb9667' });
    this.arrayDatas.push({ name: "Male", isoCode: 1, icon:'fa fa-wrench', bgcolor: 'fb9667', color: 'fb9667' });
    this.arrayDatas.push({ name: "Male", isoCode: 1, icon:'fa fa-wrench', bgcolor: 'fb9667', color: 'fb9667' });
    this.arrayDatas.push({ name: "Male", isoCode: 1, icon:'fa fa-wrench', bgcolor: 'fb9667', color: 'fb9667' });
    this.arrayDatas.push({ name: "Male", isoCode: 1, icon:'fa fa-wrench', bgcolor: 'fb9667', color: 'fb9667' });
  }


  test() {
    // TagID: 1001
    // TagLocation: ICT FishTank
    // SecretCode: z8K * pyHN & j58Rx4QVx8fPemZfLAQ9JCbJPk -? WaV
    var str = "en,1001,ICT FishTank,z8K*pyHN&j58Rx4QVx8fPemZfLAQ9JCbJPk-?WaV,";
    var splitted = str.split(",", 4);
    console.log(splitted)

    var max = 4;
    for (var i = 0; i < max; i++) {
      var pushFilter = splitted[i];
      if (i > 0) {
        this.payload.push(pushFilter);
      }
      console.log(splitted[i]);
    }

    console.log('Payload', this.payload)
    console.log('Payload', this.payload[0])
    console.log('Payload', this.payload[1])
    console.log('Payload', this.payload[2])
  }



}


type SampleDataType = { name: string, isoCode: number, icon: string, bgcolor: string, color: string};    // Specified format
