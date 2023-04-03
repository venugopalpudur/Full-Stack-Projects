import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Course } from '../Course';
import { authService } from '../services/authService.service';
import { ServicesService } from '../services/services.service';
import { UserDTO } from '../UserDTO';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  constructor(
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  param1!: string;
  param2 = false;
  param3 = false;

  ngOnInit(): void {
    this.router.routerState.root.queryParams.subscribe((params) => {
      this.param1 = params['id']; //courseId
      this.param2 = params['update'];
      this.param3 = params['add'];
    });
    if (this.authService.isLoggedIn()) {
      if (this.param2) {
        this.services.getUser(this.authService.getToken()).subscribe(
          (resp: any) => {
            this.user = resp;
            for (
              let index = 0;
              index < this.user.createdCourses.length;
              index++
            ) {
              if (this.user.createdCourses[index].courseId == this.param1) {
                const element = this.user.createdCourses[index];
                this.title = element.title;
                this.htmlContent = element.description;
              }
            }
            //location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      }
    } else {
      this.router.navigate(['/login']);
    }
  }

  htmlContent = '';
  title = '';
  response!: any;
  user!: UserDTO;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
  };

  addCourse(htmlContent: string, title: string) {
    let createCourse = <Course>{};
    createCourse.title = title;
    createCourse.description = htmlContent;
    this.services
      .addCourse(createCourse, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.response = resp;
          if (resp != null) {
            this.router.navigate(['/course'], {
              queryParams: { id: this.response.courses[0].courseId },
            });
          }
          //console.log(this.response);
          //location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateCourse(htmlContent: string, title: string) {
    let createCourse = <Course>{};
    createCourse.title = title;
    createCourse.description = htmlContent;
    this.services
      .updateCourse(createCourse, this.param1, this.authService.getToken())
      .subscribe(
        (resp: any) => {
          this.response = resp;
          if (resp != null) {
            this.router.navigate(['/course'], {
              queryParams: { id: this.param1 },
            });
          }
          //location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
