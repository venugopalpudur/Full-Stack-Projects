import { response } from 'src/app/response';
import { Component, OnInit } from '@angular/core';
import { Cart } from '../Cart';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    private authService: authService,
    private services: ServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /*if (this.authService.isLoggedIn()) {
      this.isLogged = this.authService.isLoggedIn();
      console.log('if');
    } else {
      this.router.navigate(['/home']);
      console.log('else');
    }*/

    this.addToCart();
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.param1 = params['refresh'];
    });
    /*if (this.param1) {
      this.router.navigate(['/cart'], {
        queryParams: { refresh: false },
      });
    }*/

    const firstTime = localStorage.getItem('key');
    if (!firstTime) {
      localStorage.setItem('key', 'loaded');
      location.reload();
    } else {
      localStorage.removeItem('key');
    }

    if (this.authService.getFlag()) {
      this.authService.setFlag(false);
      this.router.navigate(['/cart']);
    }
  }

  cartItems!: Cart;
  response!: any;
  user!: any;
  param1!: any;
  totalPrice = 0;
  order!: any;
  allOrder!: any;
  isLogged = false;

  addToCart() {
    //console.log(JSON.parse(this.authService.getCart()));
    let cart = new Cart(JSON.parse(this.authService.getCart()));
    this.cartItems = cart;
    this.getUser();

    //console.log(this.cartItems);
  }

  reload() {
    location.reload();
  }

  directToHome() {
    this.router.navigate(['/home']);
  }

  getOrder(id: number) {
    this.services.getAllOrders(this.authService.getToken(), id).subscribe(
      (resp: any) => {
        this.allOrder = resp;

        console.log(this.allOrder.cart.items);
        /*for (let index = 0; index < resp.cart.items.length; index++) {
          const element =
            resp.cart.items[index].price * resp.cart.items[index].quantity;
          this.totalPrice += element;
          console.log(this.totalPrice);
        }*/

        //location.reload();
      },
      (error) => {
        console.log('error is here');
        console.log(error);
      }
    );
  }

  getaddToCart(id: number, cart: Cart) {
    this.services.getAddToCart(this.authService.getToken(), id, cart).subscribe(
      (resp: any) => {
        this.response = resp;
        console.log(resp.cart);
        for (let index = 0; index < resp.cart.items.length; index++) {
          const element =
            resp.cart.items[index].price * resp.cart.items[index].quantity;
          this.totalPrice += element;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  placeOrder(id: number) {
    this.services.getPlaceOrder(this.authService.getToken(), id).subscribe(
      (resp: any) => {
        this.order = resp;
        this.response = resp;
        console.log(resp.order);
        let items = new Array();
        this.authService.setCart(items);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.user = resp;
        let cart = new Cart(JSON.parse(this.authService.getCart()));
        this.cartItems = cart;
        this.getOrder(resp.customerId);
        if (this.cartItems.items.length != 0) {
          this.getaddToCart(resp.customerId, this.cartItems);
        }
        console.log(this.user.customerId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
