import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../_services/account.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  username: any;
  IsLoggedIn: boolean = false;

  constructor(
    private accountService: AccountService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.form.controls; }

  onSubmit() {
    debugger;
    this.username = this.form.value.username;

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    else if (this.form.value.username == "admin" && this.form.value.password == "admin" ||
      this.form.value.username == "user" && this.form.value.password == "user")
    {
      this.alertify.success("login successful");

      localStorage.setItem('user', this.username);

      this.router.navigateByUrl('device');
    }
    else {
      this.alertify.error("Invalid username or password!!");
    }
  }
}
