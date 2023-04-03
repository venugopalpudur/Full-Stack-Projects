import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { auth } from './../auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  token: auth | undefined;
  ex: any | undefined;
  order!: any;
  user!: any;

  ngOnInit(): void {
    if (this.authService.isLoggedIn() == true) {
      this.router.navigate(['/home']);
    }
    this.getUser();
  }

  getOrder(id: number) {
    this.services.getAllOrders(this.authService.getToken(), id).subscribe(
      (resp: any) => {
        this.order = resp;
        console.log(resp.customer);
        //location.reload();
      },
      (error) => {
        console.log('error is here');
        console.log(error);
      }
    );
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.user = resp;
        console.log(this.user.customerId);
        this.getOrder(this.user.customerId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  login(loginForm: NgForm) {
    this.services.auth(loginForm.value).subscribe(
      (response: any) => {
        //this.get();
        console.log(response);
        if (response.statusCode == 203) {
          alert(response.exception);
        } else {
          this.token = response;
          this.authService.clear();
          this.authService.setToken(response.token);
          location.reload();
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  /*get() {
    this.services
      .getAllCourses(this.authService.getToken())
      .subscribe((resp: any) => {
        console.log(resp);
        this.ex = resp;
      });
  }*/
}
