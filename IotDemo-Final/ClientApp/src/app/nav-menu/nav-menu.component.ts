import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  IsActive: boolean=false;

  constructor(
    private router: Router  ) {

    //debugger;
    //this.IsActive =this.accountService.IsLoggedIn;
  }

  logOut() {
    localStorage.removeItem('user');
    this.router.navigateByUrl('');
  }
 
  collapse() {
    this.isExpanded = false;
  }

  LogOut() {
    debugger;
    localStorage.removeItem('user');
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
    //this.IsActive = false;
  }
}
