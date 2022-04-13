import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Device } from '../_models/Device';
import { BaseResponseModel } from '../_models/_base.response.model';
import { map } from 'rxjs/operators';
import { Key } from 'protractor';
//import { Device } from '../_models/Device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  deviceList: any;
  getJSON: any;
  device: Device;
  baseUrl = "";

  constructor(private http: HttpClient,
    @Inject('BASE_URL') base: string
  ) {
    if (environment.env === 'local') {
      this.baseUrl = environment.apiUrl + "IOTDemo/v1/";
    } else {
      this.baseUrl = environment.apiUrl + "IOTDemo/v1/";
    }
  }

  getDevices(model:any) {
      debugger;
    var request = {
      deviceId: "",
      user: localStorage.getItem('user')
    }
    return this.http.post(this.baseUrl + "getdevices", request);
    }
 
  getDeviceDetail(model) {
    debugger;
    var request = {
      deviceId: this.device.deviceId,
      user: localStorage.getItem('user')
    }
    return this.http.post(this.baseUrl + "getdevices", request)
      .pipe(
        map((resp: any) => {
          debugger;
          return resp;
        }));
  }

  uploadDevice(model: any) {
    debugger;
    var request = [{
      createdBy: localStorage.getItem('user'),
      name: model.name,
      description: model.description,
      make: model.make,
      softwareVersion: model.softwareVersion,
      sensorsName: model.sensorsName,
      deviceId: model.deviceId
    }];
    //console.log(request);
    return this.http.post(this.baseUrl + 'registerdevice', request)
      //{ headers: this.getHTTPHeaders() }).pipe(
      //  map((res: BaseResponseModel) => res)
      //);
  }

  uploadBulkDevice(devices: Device[]): Observable<BaseResponseModel> {
    debugger;
    /*const mapped = Object.keys(devices).map(key => ({ type: key, value: devices[key] }));*/

    var request = { devices };
    //console.log(request);
    return this.http.post(this.baseUrl + 'registerdevice', request.devices,
      { headers: this.getHTTPHeaders() }).pipe(
        map((res: BaseResponseModel) => res)
      );
  }

  getSensorsData(model: any) {
    debugger;
    return this.http.post(this.baseUrl + "getsensordata", model)
      .pipe(
        map((resp: any) => {
          debugger;
          return resp;
        }));
  }

  onRefersh() {

  }

  getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders();
    result.set('Content-Type', 'application/json');
    return result;
  }
}
