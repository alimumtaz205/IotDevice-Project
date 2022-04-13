import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  IsLoggedIn: boolean;

  constructor() {

    //if (localStorage.getItem("user") === null) {
    //  this.IsLoggedIn = true;
    //}
  }

}
