import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-tab-device',
  templateUrl: './tab-device.component.html',
  styleUrls: ['./tab-device.component.css']
})
export class TabDeviceComponent implements OnInit {
  @Output() refreshGrid: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<TabDeviceComponent>) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }
}
