import { Services } from './Services';
import { Patient } from './Patient';
import { HttpStatusCode } from '@angular/common/http';
import { Error } from './Error';

export class Status {
  timestamp!: Date;
  path!: string;
  statusCode!: HttpStatusCode;
  //private String tags;
  responseStatus!: boolean; // true for response, else false for error or exception
  patient!: Array<Patient>;
  services!: Array<Services>;
  //private String exception;
  error!: Error;
  constructor(
    timestamp: Date,
    path: string,
    statusCode: HttpStatusCode,
    //private String tags;
    responseStatus: boolean, // true for response, else false for error or exception
    patient: Array<Patient>,
    services: Array<Services>,
    //private String exception;
    error: Error
  ) {}
}
