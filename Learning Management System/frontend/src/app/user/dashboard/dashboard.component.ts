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

  tabToggle(index: number) {
    this.showTab = index;
    console.log(this.showTab);
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.roles = resp.roles;
        this.response = resp;
        if (this.response.registeredCourses.length > 0) {
          for (let i = 0; i < this.response.registeredCourses.length; i++) {
            const element = this.response.registeredCourses[i];
            this.readTime = this.calculateReadTime(element.description);
            this.readTimeArray.push(this.readTime);
          }
          //console.log(this.readTimeArray);
        }

        if (this.response.createdCourses.length > 0) {
          for (let i = 0; i < this.response.createdCourses.length; i++) {
            const element = this.response.createdCourses[i];
            this.readTime = this.calculateReadTime(element.description);
            this.createArray.push(this.readTime);
          }
          //console.log(this.createArray);
        }

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
