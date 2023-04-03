import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from '../Role';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { UserDTO } from '../UserDTO';

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
}
