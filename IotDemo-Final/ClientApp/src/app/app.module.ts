import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceComponent } from './device/device.component';
import { LoginComponent } from './account/login/login.component';
import { AddDeviceComponent } from './device/add-device/add-device.component';
import { DeviceChartComponent } from './device/device-chart/device-chart.component';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { MatCardModule, MatDatepickerModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import { TabDeviceComponent } from './tab-device/tab-device.component';
import { BluckUploadComponent } from './device/bluck-upload/bluck-upload.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    DeviceComponent,
    LoginComponent,
    AddDeviceComponent,
    DeviceChartComponent,
    TabDeviceComponent,
    BluckUploadComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgApexchartsModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatListModule,
    MatDatepickerModule,
    MatTabsModule,
    MatMenuModule,
    MatTooltipModule,
    RouterModule.forRoot([
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'device', component: DeviceComponent },
      { path: 'add', component: AddDeviceComponent },
      { path: 'chart', component: DeviceChartComponent },
      { path: 'home', component: HomeComponent },
      { path: 'tab', component: TabDeviceComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ]),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
