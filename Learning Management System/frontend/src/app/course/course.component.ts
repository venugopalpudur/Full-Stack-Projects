import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Review } from '../Review';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { UserDTO } from '../UserDTO';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  response!: UserDTO; // or responseDTO
  param1!: string;
  course!: any;
  reviewIDs!: Array<number>;
  //user!: UserDTO;

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.param1 = params['id'];
    });
    if (this.authService.isLoggedIn()) {
      if (this.param1 != '') {
        this.getUser();
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  getUser() {
    this.services.getUser(this.authService.getToken()).subscribe(
      (resp: any) => {
        this.response = resp;
        console.log(this.response);
        if (this.response.registeredCourses.length > 0) {
          for (
            let index = 0;
            index < this.response.registeredCourses.length;
            index++
          ) {
            if (
              this.response.registeredCourses[index].courseId == this.param1
            ) {
              this.course = this.response.registeredCourses[index];
              this.showDelete(this.response, this.course);
            }
          }
        }
        if (this.response.createdCourses.length > 0) {
          for (
            let index = 0;
            index < this.response.createdCourses.length;
            index++
          ) {
            if (this.response.createdCourses[index].courseId == this.param1) {
              this.course = this.response.createdCourses[index];
              this.showDelete(this.response, this.course);
              //console.log('--------------------');
            }
          }
        }
        this.showDelete(this.response, this.course);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addReview(review: Review) {
    console.log(review);
    this.services
      .addReviewToCourse(review, this.param1, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.response = resp;
          location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteReview(reviewId: number) {
    //console.log(review);
    this.services.deleteReview(reviewId, this.authService.getToken()).subscribe(
      (resp: any) => {
        //this.response = resp;
        location.reload();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showDelete(response: any, course: any) {
    let array = [];
    for (let index = 0; index < course.reviews.length; index++) {
      for (let j = 0; j < response.reviews.length; j++) {
        if (course.reviews[index].id == response.reviews[j].id) {
          array.push(this.response.reviews[j].id);
        }
      }
    }
    this.reviewIDs = array;
    console.log(this.reviewIDs);
  }

  /*getCourse(courses: any) {
    for (let index = 0; index < courses.registeredCourses.length; index++) {
      if (this.response.registeredCourses[index].courseId == this.param1) {
        this.course = this.response.registeredCourses[index];
      }
    }
    if (Object.keys(this.course).length === 0) {
      this.router.navigate(['/home']);
    }
  }*/
}
