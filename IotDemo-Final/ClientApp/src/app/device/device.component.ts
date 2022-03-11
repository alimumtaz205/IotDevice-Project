import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';
import { TabDeviceComponent } from '../tab-device/tab-device.component';
import { Device } from '../_models/Device';
import { Sensors } from '../_models/Sensors';
import { AlertifyService } from '../_services/alertify.service';
import { DeviceService } from '../_services/device.service';
import { AddDeviceComponent } from './add-device/add-device.component';
import { DeviceChartComponent } from './device-chart/device-chart.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {
  columnDefs: any;
  baseUrl = "";
  list: any;
  updatedList: any;
  deviceList: any;
  sensors: any;
  resetFormSubject: Subject<boolean> = new Subject<boolean>();
  //gridHeight = '1000px';
  lovHeight = '244px';
  datasource: any;
  displayedColumn = [];
  model: any;
  data: any;
  TitleText: any;

  rows = [];
  columns = [
    { columnDef: 'deviceId', header: 'Device ID', cell: (row: any) => `${row.deviceId}` },
    { columnDef: 'deviceName', header: 'Device Name', cell: (row: any) => `${row.deviceName}` },
   // { columnDef: 'serialNumber', header: 'Serial Number', cell: (row: any) => `${row.serialNumber}` },
    { columnDef: 'make', header: 'Make', cell: (row: any) => `${row.make}` },
    { columnDef: 'description', header: 'Description', cell: (row: any) => `${row.description}` },
    { columnDef: 'currentVersion', header: 'Current Version', cell: (row: any) => `${row.currentVersion}` },
    { columnDef: 'updatedVersion', header: 'Updated Version', cell: (row: any) => `${row.updatedVersion}` },
    { columnDef: 'isUpdateAvailable', header: 'Is Update Available', cell: (row: any) => `${row.isUpdateAvailable}` },
    { columnDef: 'action', header: 'Action' },
  ];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  selection = new SelectionModel<any>(false, []);
    device: any;

  constructor(
    public matDialog: MatDialog,
    private router: Router,
    public alertify: AlertifyService,
    private service: DeviceService) { }

  ngOnInit() {
    //debugger;
    this.getDevices(this.model);
  }

  getDevices(model: any) {

    this.service.getDevices(model).subscribe(
      (data: any) => {
        //debugger;
        console.log(data)
      
        //debugger;

        this.datasource = new MatTableDataSource<any>(data.data);


        this.displayedColumn = this.columns.map(x => x.columnDef);

        this.datasource.paginator = this.paginator;
        this.datasource.sort = this.sort;

        var filterEelement: any = document.getElementById('filterEelement');
        if (filterEelement.value !== '') {
          this.datasource.filter = filterEelement.value.trim().toLowerCase();
        }
        else {
          //this.alertify.success("successful");
        }
        (error) => {
          this.alertify.error("error");
        }
      });
  }

  applyFilter(event: Event) {
    //debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();
  }

  addDevice(model: any): void {
    //debugger;
    const dialogRef = this.matDialog.open(TabDeviceComponent, {
      disableClose: true,
      //autoFocus: false,
      
      width: '60%',
     /* height: '40%'*/
    });
    dialogRef.componentInstance.refreshGrid.subscribe((data) => {

      setTimeout(() => {
      }, 300);
    });

  }

  viewDevice(data: any) {
    ////debugger;
    //let dialogRef = this.matDialog.open(DeviceChartComponent, {
    //  disableClose: false,
    //  //autoFocus: false,

    //  width: '60%',
    //  /* height: '40%'*/
    //});
    //dialogRef.componentInstance.refreshGrid.subscribe((data) => {
      
    //  setTimeout(() => {
    //  }, 300);
    //});
    this.service.device = data;
    this.router.navigateByUrl('chart');
   
  }

  updateDevice(model:any) {
    //debugger;
    this.TitleText = "Update Device";
    const dialogRef = this.matDialog.open(AddDeviceComponent, {
      disableClose: false,
      //autoFocus: false,

      width: '60%',
      /* height: '40%'*/
    });
    dialogRef.componentInstance.refreshGrid.subscribe((data) => {

      setTimeout(() => {
      }, 300);
    });

  }

  navigateToDevice(row: any) {
    //debugger;
    this.router.navigateByUrl('chart');
  }
}
