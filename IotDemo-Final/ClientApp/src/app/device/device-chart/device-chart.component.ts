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
  resCode: any;
  model: any;
  sensors: Sensors;

  constructor(
   // @Inject(MAT_DIALOG_DATA) public data: any,
    private service: DeviceService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router) {

  }

  ngOnInit() {
    debugger;
    this.getSensorsList();
    this.getDeviceDetail(this.service.device);
   
  }
  get f() { return this.form.controls; }

  getSensorsList() {
    debugger;
    //this.service.getSensors().subscribe(
      //(data: any) => {
      //  debugger;
      //  console.log(data.Sensors)
      //  if (data.Sensors) {
      //    this.sensors = data.Sensors;

        //  for (let sensorlist in this.sensors)
            this.chartOptions = {
              chart: {
                height: 350,
                type: "line",
                foreColor: '#6D6D6D'
              },
              series: [{
                name: 'Temperature',
                data: [15, 20, 25, 29, 33, 36]
              }, {
                name: 'Humidity',
                type: 'line',
                data: [37, 32, 27, 23, 26, 38]
              }, {
                name: 'Object Presence',
                type: 'line',
                data: [12.8, 0, 0, 16, 15, 10]
              }
              ],

              title: {
                text: "Sensors"
              },
              xaxis: {
                type: 'category',
                categories: [
                  ['4 AM'],
                  ['6 AM'],
                  ['8 AM'],
                  ['10 AM'],
                  ['12 PM'],
                  ['2 PM'],
                  ['4 PM'],
                  ['6 PM'],
                  ['8 PM'],
                  ['10 PM']
                ],
                labels: {
                  show: true
                }
              }
            };

          debugger;
      //  }
      //  else {
      //    this.alertify.success("An error occured !!!");
      //  }
      //  (error) => {
      //    this.alertify.error("error");
      //  }
      //});
  }

  getDeviceDetail(model) {
    debugger;
    this.service.getDeviceDetail(this.model).subscribe(
      (data: any) => {
        debugger;
        console.log(data)
        if (data.resCode == 100) {
          this.deviceDetail = data.data[0];
        }

      });
  }

  backDashboard() {
    this.router.navigateByUrl('device');
  }
}
