import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { Device } from '../../_models/Device';
import { AlertifyService } from '../../_services/alertify.service';
import { DeviceService } from '../../_services/device.service';
import { DeviceComponent } from '../device.component';


@Component({
  selector: 'app-add-device',
  templateUrl: './add-device.component.html',
  styleUrls: ['./add-device.component.css']
})
export class AddDeviceComponent implements OnInit {
  @Output() refreshGrid: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  loading = false;
  submitted = false;
  device: Device;


  constructor(
    private formBuilder: FormBuilder,
    public deviceService: DeviceService,
    private alertify: AlertifyService,
    private router: Router,
    private dialogRef: MatDialogRef<AddDeviceComponent>
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
        deviceId: ['', Validators.required],
        name: ['', Validators.required],
        description: ['', Validators.required],
        make: [''],
        softwareVersion: [''],
        sensorsName: [''],
      createdBy: [localStorage.getItem('user')]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    //this.loading = true;
    this.device = this.form.value
    this.deviceService.uploadDevice(this.device).subscribe(
        (data: any) => {
          debugger;
        if (data.resCode == 100) {
          if (data.isSuccess === false) {
            this.alertify.error(data.resDesc);
          }
          else {
            this.alertify.success(data.resDesc);
            this.onClose();
           
          }
        }
        else {
          this.alertify.error(data.resDesc);
          this.onClose();
         
        }});
  }

  
  onClose() {
    this.dialogRef.close();
  }
}

