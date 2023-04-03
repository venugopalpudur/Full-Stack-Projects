import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  ngOnInit(): void {
    this.getCourses();
    console.log(this.authService.isLoggedIn());
    if (this.authService.isLoggedIn() == true) {
      this.getUser();
    }
  }

  user!: any;

  getCourses() {
    this.services.getAllCourses(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        console.log(resp);

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
        //console.log(this.user.roles);
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
