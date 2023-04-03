import { Password } from './../../Password';
import { authService } from './../../services/authService.service';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { UserDTO } from 'src/app/UserDTO';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { response } from 'src/app/response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUser();
    } else {
      this.router.navigate(['/login']);
    }
  }

  showTab = 1;
  response!: UserDTO;
  readTime!: number;
  oldPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
  enrolled!: any;
  readTimeArray: number[] = [];
  createArray: number[] = [];
  delete!: any;
  roles!: any;
  order!: any;

  products!: any;
  images!: any;
  retrievedImage!: any;
  base64Data!: any;
  retrieveResponse!: any;
  imagesList = new Array();

  tabToggle(index: number) {
    this.showTab = index;
    console.log(this.showTab);
  }

  getOrder(id: number) {
    this.services.getAllOrders(this.authService.getToken(), id).subscribe(
      (resp: any) => {
        this.order = resp;
        let price = 0;
        for (let index = 0; index < this.order.viewAllOrders.length; index++) {
          for (
            let j = 0;
            j < this.order.viewAllOrders[index].items.length;
            j++
          ) {
            price +=
              this.order.viewAllOrders[index].items[j].price *
              this.order.viewAllOrders[index].items[j].quantity;
          }
          this.order.viewAllOrders[index].total = price;
          price = 0;
        }
        console.log(this.order.viewAllOrders);

        this.getAllProducts();
      },
      (error) => {
        console.log('error is here');
        console.log(error);
      }
    );
  }

  getAllProducts() {
    this.services.getAllProducts().subscribe(
      (resp: any) => {
        this.products = resp;
        this.getAllImages();
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
        //console.log(id);
        console.log(this.imagesList);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.roles = resp.roles;
        this.response = resp;
        console.log(this.response);
        this.getOrder(this.response.customerId);
        /*if (this.response.registeredCourses.length > 0) {
          for (let i = 0; i < this.response.registeredCourses.length; i++) {
            const element = this.response.registeredCourses[i];
            this.readTime = this.calculateReadTime(element.description);
            this.readTimeArray.push(this.readTime);
          }
          //console.log(this.readTimeArray);
        }*/

        /*if (this.response.createdCourses.length > 0) {
          for (let i = 0; i < this.response.createdCourses.length; i++) {
            const element = this.response.createdCourses[i];
            this.readTime = this.calculateReadTime(element.description);
            this.createArray.push(this.readTime);
          }
          //console.log(this.createArray);
        }*/

        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSubscriber(courseId: string) {
    console.log(courseId);
    this.services
      .getSubscribers(courseId, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.enrolled = resp;
          console.log(this.enrolled);
          //location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateProfile() {
    let user = <User>{};
    user.name = this.response.name;
    user.surname = this.response.surname;
    user.username = this.response.username;
    user.email = this.response.email;
    user.phone = this.response.phone;
    this.services.updateUser(user, this.authService.getToken()).subscribe(
      (resp: any) => {
        //this.response = resp;

        if (
          user.email != resp.email ||
          user.name != resp.name ||
          user.surname != resp.surname ||
          user.phone != resp.phone
        ) {
          alert('Details updated!');
          setTimeout(function () {
            location.reload();
          }, 1000);
        } else {
          this.authService.clear();
          this.router.navigate(['/home']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteCourse(courseId: string) {
    this.services.deleteCourse(courseId, this.authService.getToken()).subscribe(
      (resp: any) => {
        this.delete = resp;
        if (this.delete == null) {
          location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteAllCourse() {
    this.services.deleteAllCourses(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.delete = resp;
        if (this.delete == null) {
          location.reload();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changePassword() {
    let pass = <Password>{};
    pass.oldPassword = this.oldPassword;
    pass.newPassword = this.newPassword;
    pass.confirmNewPassowrd = this.confirmNewPassword;
    this.services.changePassword(pass, this.authService.getToken()).subscribe(
      (resp: any) => {
        if (resp != null) {
          alert('Password changed !');
          setTimeout(function () {
            location.reload();
          }, 1000);
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
  editCourse(courseId: string) {
    //this.response.registeredCourses;
    console.log(courseId);
    this.router.navigate(['/editor'], {
      queryParams: { id: courseId, update: true },
    });
  }

  calculateReadTime(text: string) {
    const wordsCount = text.split(/\s+/g).length;
    const minutes = wordsCount / 200;
    return Math.ceil(minutes);
  }
}
