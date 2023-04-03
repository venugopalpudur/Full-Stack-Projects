import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from '../Payment';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.param1 = params['id']; //courseId
    });
    if (this.authService.isLoggedIn()) {
      if (this.param1 != null) {
        this.getCourse();
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
  showTab = 1;
  param1!: string;
  amount = 50;
  remarks = '';
  response!: any;
  payId = 0;
  otp!: number;
  success = false;

  tabToggle(index: number) {
    this.showTab = index;
    console.log(this.showTab);
  }

  getCourse() {
    this.services.getAllCourses(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        /*for (let index = 0; index < this.response.length; index++) {
          if (this.response[index] == this.param1) {
            this.amount = this.response[index].price;
          }
        }*/
        //console.log(this.response);
        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  savePayment() {
    let pay = <Payment>{};
    pay.amount = this.amount;
    pay.remarks = this.remarks;
    console.log(pay);
    this.services
      .savePayment(pay, this.param1, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.payId = resp;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  confirmPayment(otp: any) {
    otp = Number(
      otp.first + otp.second + otp.third + otp.fourth + otp.fifth + otp.sixth
    );
    this.services.confirmPayment(otp, this.payId).subscribe(
      (resp: any) => {
        this.response = resp;
        if (this.response) {
          this.subscribe(this.payId);
        } else {
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  subscribe(payId: number) {
    this.services
      .subscribeCourse(this.param1, payId, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.response = resp;
          this.success = true;
          this.showTab = 3;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
