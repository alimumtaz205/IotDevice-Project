import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';
import { from, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  // OTP Clear
  private OtpClear = new Subject<any>();
  OtpClearObservable$ = this.OtpClear.asObservable();

  ErrorConnectionMsg = "Services are temporarily unavailable.Try reloading the page";

  addUpdatePopup(content: any, title: string) {
    alertify.alert(content).setHeader(title).set('maximizable', true);
  }

  alert(title: string, message: string) {
    alertify.alert('<b>' + title + '</b>', message);
  }

  closeAlert() {
    alertify.alert().close();
  }

  // alertify.confirm('Confirm Title', 'Confirm Message', function(){ alertify.success('Ok') }
  //               , function(){ alertify.error('Cancel')});

  confirm(title: string, message: any, okCallback: () => any) {
    alertify.confirm('<b>' + title + '</b>', message, (e: any) => {
      if (e) {
        return okCallback();
      } else { }
    }, null);
  }

  sessionExpire(title: string, message: any, okCallback: () => any, cancelCallback: () => any) {
    alertify.confirm('<b>' + title + '</b>', message, (e: any) => {
      if (e) {
        return okCallback();
      } else { }
    }, (e: any) => {
      if (e) {
        return cancelCallback();
      }
    }).set('closable', false);
  }

  deleteConfirm(okCallback: () => any) {
    alertify.confirm('<b>Delete</b>', 'Are you sure want to delete.', (e: any) => {
      if (e) {
        return okCallback();
      } else { }
    }, null);
  }

  success(message: string) {
    if (message == 'Profile name already exists.') {
      alertify.error(message);
    }

    else {
      alertify.success(message);
    }
  }

  error(message: string) {
    alertify.error(message);
  }

  warning(message: string) {
    alertify.warning(message);
  }

  message(message: string) {
    alertify.message(message);
  }

  prompt(title: string, message: string, okCallback: () => any) {
    alertify.prompt(null, message, (e: any) => {
      if (e) {
        return okCallback();
      } else { }
    }).setHeader(title).set('resizable', true);
  }
}
