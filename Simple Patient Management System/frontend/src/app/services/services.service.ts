import { Patient } from './../Patient';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/environments/environment';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  constructor(private httpClient: HttpClient) {}

  private _refreshrequired = new Subject<void>();

  get Refreshrequired() {
    return this._refreshrequired;
  }

  public getPatient() {
    let resp = this.httpClient.get(`${baseUrl}patient`);
    return resp;
  }

  public getServices() {
    let resp = this.httpClient.get(`${baseUrl}services`);
    return resp;
  }

  public addPatient(patient: Patient) {
    //console.log(patient);

    let resp = this.httpClient.post(`${baseUrl}addpatient`, patient).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    return resp;
  }

  public getPatientById(pid: number) {
    let resp = this.httpClient.get(`${baseUrl}getpatient/${pid}`);
    return resp;
  }

  public getServicesById(sid: number) {
    let resp = this.httpClient.get(`${baseUrl}getservice/${sid}`);
    return resp;
  }

  public getServicesByName(serviceName: string) {
    let resp = this.httpClient.get(
      `${baseUrl}getservicesbyname?serviceName=${serviceName}`
    );
    return resp;
  }

  public updatePatient(pid: number, patient: Patient) {
    let resp = this.httpClient
      .put(`${baseUrl}updatepatient/${pid}`, patient)
      .pipe(
        tap(() => {
          this._refreshrequired.next();
        })
      );
    return resp;
  }

  public deletePatient(pid: number) {
    let resp = this.httpClient.delete(`${baseUrl}deletepatient/${pid}`).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    return resp;
  }

  public deleteAllPatients() {
    let resp = this.httpClient.delete(`${baseUrl}deleteallpatients`).pipe(
      tap(() => {
        this._refreshrequired.next();
      })
    );
    return resp;
  }
}
