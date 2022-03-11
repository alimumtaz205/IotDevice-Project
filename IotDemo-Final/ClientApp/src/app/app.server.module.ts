import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { ChartComponent } from 'ng-apexcharts';
import { LoginComponent } from './account/login/login.component';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceChartComponent } from './device/device-chart/device-chart.component';
import { DeviceComponent } from './device/device.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DeviceComponent,
    AddDeviceComponent,
    DeviceChartComponent
  ],

    imports: [AppModule, ServerModule, ModuleMapLoaderModule],
    bootstrap: [AppComponent]
})
export class AppServerModule { }
