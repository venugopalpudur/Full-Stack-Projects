import { authService } from './../services/authService.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  isUserLoggedIn = false;
  admin = false;
  response!: any;
  order!: any;
  cart!: any;

  ngOnInit(): void {
    if (this.authService.isLoggedIn() == true) {
      this.isUserLoggedIn = true;
      this.admin = this.authService.getRole() && 1;
      this.getUser();
    } else {
      this.isUserLoggedIn = false;
    }
  }

  direct() {
    this.router.navigate(['/cart'], {
      queryParams: { refresh: true },
    });
    this.authService.setFlag(true);
    location.reload();
  }

  getOrder(id: number) {
    this.services.getAllOrders(this.authService.getToken(), id).subscribe(
      (resp: any) => {
        this.order = resp;
        this.getCart(this.order.customerCart.cartId);
        console.log(this.order.cart.items.length);
        //location.reload();
      },
      (error) => {
        console.log('error is here');
        console.log(error);
      }
    );
  }

  getCart(id: number) {
    this.services.getCart(id).subscribe(
      (resp: any) => {
        this.cart = resp;
        //console.log(resp);
        //location.reload();
      },
      (error) => {
        console.log('error is here');
        console.log(error);
      }
    );
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.clear();
    location.reload();
    this.router.navigate(['/login']);
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        //console.log(resp);
        this.getOrder(resp.customerId);
        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
