import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../Cart';
import { Item } from '../Item';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  response!: any;
  readTimeArray: number[] = [];
  readTime!: number;
  order!: any;
  products!: any;
  productsAll!: any;
  inventory!: any;
  items = new Array();
  cartItems!: Cart;
  quantity!: any;
  images!: any;
  retrievedImage!: any;
  base64Data!: any;
  retrieveResponse!: any;
  imagesList = new Array();

  ngOnInit(): void {
    this.getCourses();
    //console.log(this.authService.isLoggedIn());
    //console.log(this.authService.getToken());
    //this.getOrder();
    this.getUser();
    this.getAllProducts();
    if (this.authService.isLoggedIn() == true) {
      this.getUser();
    }
    let items = new Array();
    this.authService.setCart(items);
  }

  user!: any;

  /*getOrder() {
    this.services.getAllOrders(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.order = resp;
        //console.log(resp);

        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }*/

  getAllProducts() {
    this.services.getAllProducts().subscribe(
      (resp: any) => {
        this.products = resp;
        this.getAllImages();
        //console.log(this.products);

        this.getAllInventories();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllImages() {
    this.services.getAllImages().subscribe(
      (resp: any) => {
        this.images = resp;

        /*for (let index = 0; index < this.products.length; index++) {
          for (let i = 0; i < this.images.length; i++) {
            console.log('here--------------------------');
            if (this.products[index].id === this.images[i].productId) {
              this.retrieveResponse = this.images[i];

              this.base64Data = this.retrieveResponse.file;
              this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
              this.imagesList.push(this.retrievedImage);
              console.log(this.retrievedImage);
            }
          }
        }*/
        /*for (let index = 0; index < this.products.length; index++) {
          this.retrieveResponse = this.images[index];
          this.base64Data = this.retrieveResponse.file;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrieveResponse.file = this.retrievedImage;
          this.imagesList.push(this.retrieveResponse);
          console.log(this.retrievedImage);
        }*/

        for (let index = 0; index < this.products.length; index++) {
          this.getImage(this.products[index].id);
        }
        //console.log(this.imagesList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImage(id: number) {
    this.services.getImage(id).subscribe(
      (response: any) => {
        this.retrieveResponse = response;
        this.base64Data = this.retrieveResponse.file;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        this.retrieveResponse.file = this.retrievedImage;
        this.imagesList.push(this.retrieveResponse);
        console.log(id);
        //console.log(this.imagesList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllInventories() {
    this.services.getAllInventories().subscribe(
      (resp: any) => {
        this.inventory = resp;

        for (let index = 0; index < this.products.length; index++) {
          for (let j = 0; j < this.inventory.length; j++) {
            if (this.products[index].id == this.inventory[j].productId) {
              this.products[index].quantity = this.inventory[j].quantity;
            }
          }
          //console.log(this.products[index].quantity);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  clearName() {
    this.quantity = 0;
  }

  fillItems(id: string) {
    //console.log(id);
    let item;
    for (let index = 0; index < this.products.length; index++) {
      if (id === this.products[index].id) {
        item = new Item(
          this.products[index].id,
          this.products[index].productName,
          this.quantity,
          this.products[index].price
        );
        this.items.push(item);

        //console.log(item);
        this.clearName();
      }
    }
    this.authService.setCart(this.items);
  }

  addToCart() {
    console.log(this.items);
    let cart = new Cart(this.items);
    this.cartItems = cart;
    //console.log(cart);
  }

  getCourses() {
    this.services.getAllCourses(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        //console.log(resp);

        //location.reload();
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
        //console.log(this.user.registeredCourses);
        //console.log('this is user ' + this.user.roles);
        if (this.user?.roles != null) {
          for (let r = 0; r < this.user?.roles?.length; r++) {
            if (this.user?.roles[r].userRole == 'ADMIN') {
              this.authService.setRole(true);
              break;
            }
          }
          //
        }
        if (this.user?.registeredCourses?.length > 0) {
          for (let i = 0; i < this.response?.registeredCourses?.length; i++) {
            const element = this.response?.registeredCourses[i];
            this.readTime = this.calculateReadTime(element.description);
            this.readTimeArray.push(this.readTime);
          }
          console.log(this.readTimeArray);
        }
        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  viewCourse(courseId: string) {
    //this.response.registeredCourses;
    this.router.navigate(['/course'], { queryParams: { id: courseId } });
  }

  calculateReadTime(text: string) {
    const wordsCount = text.split(/\s+/g).length;
    const minutes = wordsCount / 200;
    return Math.ceil(minutes);
  }
}
