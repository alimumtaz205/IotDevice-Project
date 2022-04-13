import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ChartComponent, ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { Device } from '../../_models/Device';
import { Sensors } from '../../_models/Sensors';
import { AlertifyService } from '../../_services/alertify.service';
import { DeviceService } from '../../_services/device.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-device-chart',
  templateUrl: './device-chart.component.html',
  styleUrls: ['./device-chart.component.css']
})
export class DeviceChartComponent implements OnInit {
  @Output() refreshGrid: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("chart", { static: true }) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  form: FormGroup;
  loading = false;
  submitted = false;
  deviceList: any;
  device: Device = new Device;
  deviceDetail: any;
  deviceDetails: any;
  resCode: any;
  model: any;
  sensors: Sensors;
  dateFromObj: any;
  dateToObj: any;
  cDate: any;

  constructor(
   // @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DeviceService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    debugger;
    if (this.service.device == undefined) {
      this.router.navigateByUrl('device');
    }
    else{
      //this.alertify.alert("WORNING!!!","Please choose a date range, From and To")
    }

    this.getSensorsList(this.service.device);
    this.getDeviceDetail(this.service.device);
   
  }
  get f() { return this.form.controls; }

  getSensorsList(model: any) {
    debugger;
    var request = {
      deviceId: model.deviceId,
      startDate: "2022-03-10",
      endDate: "2022-04-11"
    }


    var request2 = {
      deviceId: model.deviceId,
      startDate: this.dateFromObj,
      endDate: this.dateToObj
    }
    this.service.getSensorsData(request).subscribe(
      (data: any) => {
        var light_intensity = [];
        //var heat = [];
        //var objectPresence = [];
        debugger;
        console.log(data)
        if (data.resCode == 100) {
          this.deviceDetail = data.data;
          for (var item of this.deviceDetail) {
            light_intensity.push(item.light_Intensity)
            //heat.push(item.heat)
            //objectPresence.push(item.objectPresence)
          }
          this.chartOptions = {
            chart: {
              height: 350,
              type: "line",
              foreColor: '#6D6D6D'
            },
            series: [{
              name: 'Temperature',
              data: light_intensity
            //}, {
            //  name: 'Heat',
            //  type: 'line',
            //  data: heat
            //}, {
            //  name: 'Object Presence',
            //  type: 'line',
            //  data: objectPresence
            }
            ],

            title: {
              text: "Sensors"
            },
            xaxis: {
              type: 'category',
              categories: [
                //[this.dateFromObj],
                //[this.dateToObj]

                ["2022-03-10"],
                ["2022-04-11"]
              ],
              labels: {
                show: true
              }
            }
          };
        }

      });
  }

  dateFrom(dateObject){
    debugger;
    console.log(dateObject.value)
    const stringified = JSON.stringify(dateObject.value);
    this.dateFromObj = stringified.substring(1, 11);
    var date = new Date;
    const currentDate = JSON.stringify(date)
    this.cDate = currentDate.substring(1, 11)

    //if (this.dateFromObj >= this.cDate) {
    //  this.alertify.error("From Date should be less than Current Date");
    //}

  }

  dateTo(dateObject) {
    debugger;
    
    console.log(dateObject.value)
    const stringified = JSON.stringify(dateObject.value);
    this.dateToObj = stringified.substring(1, 11);

    //if (this.dateFromObj >= this.dateToObj) {
    //  this.alertify.error("To Date should be greater than From");
    //}

    this.getSensorsList(this.service.device);

  }

  getDeviceDetail(model) {
    debugger;
    this.service.getDeviceDetail(this.model).subscribe(
      (data: any) => {
        debugger;
        console.log(data)
        if (data.resCode == 100) {
          this.deviceDetails = data.data[0];
        }

      });
  }

  backDashboard() {
    this.router.navigateByUrl('device');
  }
}
