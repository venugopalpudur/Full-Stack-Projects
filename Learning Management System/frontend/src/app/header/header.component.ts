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

  ngOnInit(): void {
    if (this.authService.isLoggedIn() == true) {
      this.isUserLoggedIn = true;
      this.admin = this.authService.getRole() && 1;
      this.getUser();
    } else {
      this.isUserLoggedIn = false;
    }
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
        //location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
