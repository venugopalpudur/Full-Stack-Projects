import { HttpStatusCode } from '@angular/common/http';

export class response {
  timestamp!: Date;
  Details!: string;
  HttpStatusCode!: number;
  users!: any;
  courses!: any;
  constructor(
    timestamp: Date,
    Details: string,
    HttpStatusCode: number,
    users: any,
    courses: any
  ) {
    this.timestamp = timestamp;
    this.Details = Details;
    this.HttpStatusCode = HttpStatusCode;
    this.users = users;
    this.courses = courses;
  }
}
