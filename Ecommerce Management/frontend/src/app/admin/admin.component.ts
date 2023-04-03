import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from '../Role';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { UserDTO } from '../UserDTO';
import { Product } from '../Product';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.getUser();
      console.log(this.user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  response!: any;
  showTab = 1;
  userId = '';
  user!: any;
  form!: FormGroup;
  product!: Product;
  productResponse!: any;
  retrievedImage!: any;
  base64Data!: any;
  retrieveResponse!: any;
  file!: any;

  tabToggle(index: number) {
    this.showTab = index;
    console.log(this.showTab);
  }

  getAllUsers() {
    this.services.getAllUsers(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        console.log(this.response);
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
        //---------------------
        let flag = false;
        console.log(this.user.roles);
        if (this.user.roles != null) {
          for (let r = 0; r < this.user.roles.length; r++) {
            if (this.user.roles[r].userRole == 'ADMIN') {
              this.getAllUsers();
              flag = true;
              break;
            }
          }
          if (!flag) {
            this.router.navigate(['/user/dashboard']);
          }
          //
        }

        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onclick(userId: string) {
    this.userId = userId;
  }

  assignRole(form: any) {
    let role = <Role>{};
    role.userRole = form.userRole;
    role.description = form.description;
    //console.log(role, this.userId);
    this.services
      .assignRole(role, this.userId, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.response = resp;
          //console.log(this.response);
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  /*revokeRole() {
    this.services.revokeRole(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        console.log(this.response);
        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }*/

  createProduct(productForm: NgForm) {
    let pro = new Product(
      productForm.value.name,
      productForm.value.description,
      productForm.value.price,
      productForm.value.quantity
    );
    console.log(pro);
    this.services.getAddProduct(this.authService.getToken(), pro).subscribe(
      (response: any) => {
        this.productResponse = response;
        console.log(this.productResponse);
        const image = new FormData();
        image.append('image', this.file, this.file.name);
        console.log(this.productResponse.product.id);
        this.postImage(this.productResponse.product.id, image);
        alert('Product added successfully');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getFile(event: any) {
    this.file = event.target.files[0];
  }

  postImage(id: number, file: any) {
    this.services.postImage(id, file).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImage() {
    this.services.getImage(2).subscribe(
      (response: any) => {
        this.retrieveResponse = response;
        this.base64Data = this.retrieveResponse.file;
        this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
