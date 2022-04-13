import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Device } from '../../_models/Device';
import { AlertifyService } from '../../_services/alertify.service';
import * as XLSX from 'xlsx';
import { DeviceService } from '../../_services/device.service';
import { BaseResponseModel } from '../../_models/_base.response.model';
import { finalize } from 'rxjs/operators';
import { clear } from 'console';
import { MatDialogRef } from '@angular/material';
import { AddDeviceComponent } from '../add-device/add-device.component';

@Component({
  selector: 'app-bluck-upload',
  templateUrl: './bluck-upload.component.html',
  styleUrls: ['./bluck-upload.component.css']
})
export class BluckUploadComponent implements OnInit {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable();
  bulkUploadForm: FormGroup;
  hasFormErrors = false;
  file: File;
  arrayBuffer: any;
  filelist: any;
  uploadDeviceModelList: Device[];
  outputDeviceModel: Device[] = [];
  remainingFileRecords: number;
  fileName: string;
  showTable: boolean;
  loading: boolean;
  mainArrayList: any;
  invalidFileFormat: boolean;
  @ViewChild('fileInput', { static: false }) fileVariable: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private alertify: AlertifyService,
    private deviceService: DeviceService,
    private dialogRef: MatDialogRef<AddDeviceComponent>
  ) { }

  ngOnInit() {
    this.showTable = false;
    this.loadingSubject.next(false);
    this.bulkUploadForm = this.formBuilder.group({
      deviceStatus: ['', [Validators.required]],
    });
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.bulkUploadForm.controls[controlName].hasError(errorName);
  }

  uploadData() {
    debugger;
    if (this.invalidFileFormat)
      return;

    if (this.fileVariable.nativeElement.value != '' && this.fileVariable.nativeElement.value != undefined) {
      this.uploadDeviceModelList = [];
      try {
        debugger;
        for (var i = 0; i < this.mainArrayList.length; i++) {

          var uploadDeviceModel = new Device();
          uploadDeviceModel.deviceId = this.mainArrayList[i].deviceId.toString();
          uploadDeviceModel.name = this.mainArrayList[i].name.toString();
          uploadDeviceModel.description = this.mainArrayList[i].description.toString();
          uploadDeviceModel.make = this.mainArrayList[i].make.toString();
          uploadDeviceModel.sensorsName = this.mainArrayList[i].sensorsName.toString();
          uploadDeviceModel.softwareVersion = this.mainArrayList[i].softwareVersion.toString();
          uploadDeviceModel.createdBy = localStorage.getItem('user')

          this.uploadDeviceModelList.push(uploadDeviceModel);
          if (i == this.mainArrayList.length - 1) {
            //this.uploadDevice(this.fileName, this.file.size, this.uploadDeviceModelList);
            this.uploadDevice(this.uploadDeviceModelList);
          }
        }
      } catch (e) {
        //console.log(e);
        //this.layoutUtilsService.showActionNotification("Data is not valid according to File Format.", MessageType.Create, 5000, true, false);
        this.alertify.error("Data is not valid according to File Format.");
        //this.layoutUtilsService.alertElement();
      }
    }
    else {
      this.alertify.message("Please select a file to upload device.");
    }
  }

  onFileComplete(data: any) {
    console.log(data); // We just print out data bubbled up from event emitter.
  }

  addfile(event) {
    this.invalidFileFormat = false;
    this.outputDeviceModel = [];
    this.fileName = '';
    this.mainArrayList = {};
    this.file = event.target.files[0];
    debugger;
    var arraylist;

    //if (Math.round((this.file.size / (1024 * 1024))) > environment.maxFileSize) {
    if (Math.round((this.file.size / (1024 * 1024))) > 10) {
      //this.layoutUtilsService.showActionNotification("File size is too large. Max " + environment.maxFileSize + "MB", MessageType.Create, 5000, true, false);
      //this.layoutUtilsService.alertElement("", "File size is too large. Max " + environment.maxFileSize + "MB", "");
      this.alertify.warning("File size is too large. Max 10 MB");
      return;
    }

    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
     
      this.remainingFileRecords = arraylist.length;
      debugger;
      this.fileName = + Date.now() + "-UploadDevice-" + this.file.name;

      this.mainArrayList = arraylist;
   
    }
  }

  clearFile() {
    this.fileVariable.nativeElement.value = "";
  }

  uploadDevice(data: Device[]) {
    this.loading = true;
    //this.ktDialogService.show();
    //console.log(data);
    debugger;
    this.deviceService.uploadBulkDevice(data).subscribe(
      (data: any) => {
        debugger;
        console.log(data)

        debugger;
        if (data.resCode == "100" && data.isSuccess == true)
        {
          this.alertify.success(data.resDesc);
         // window.location.reload();
          this.onClose();
        }
        else
          this.alertify.error(data.resDesc);
     });
  }

  reset() {

    this.outputDeviceModel = [];
    this.bulkUploadForm.value.clear;
    this.fileVariable.nativeElement.value = "";
    this.fileName = '';
    this.mainArrayList = {};
    this.invalidFileFormat = false;
  }

  onAlertClose($event) {
    this.invalidFileFormat = false;
  }

  onClose() {
    this.dialogRef.close();
  }
}
