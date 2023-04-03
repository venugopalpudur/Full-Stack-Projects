import { Status } from './../Status';
import { Services } from './../Services';
import { Patient } from './../Patient';
import { ServicesService } from './../services/services.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css'],
})
export class PatientComponent implements OnInit {
  patient!: Patient;
  editPatient!: Patient;
  servic!: Services;
  status!: Status;
  result!: Status;
  resp!: Status;
  //pt: Patient = new Patient(1, 'sdedf', 'asewe', new Set());

  form!: FormGroup;

  constructor(private fb: FormBuilder, private service: ServicesService) {}

  ngOnInit(): void {
    this.getPatient();
    this.creatForm();
    this.service.Refreshrequired.subscribe((item) => {
      this.getPatient();
    });
  }

  edit(patient: Patient) {
    this.editPatient = patient;
    this.editPatient.services = Array.from(patient.services);
  }

  creatForm() {
    this.form = this.fb.group({
      firstName: [null],
      lastName: [null],
      services: this.fb.array([this.servicesFrom()]),
    });
  }

  get services() {
    return this.form.get('services') as FormArray;
  }

  patchForm(patient: Patient) {
    this.clearForm();
    if (patient.services != null) {
      for (let i = 0; i < patient.services.length; i++) {
        this.services.push(this.servicesFrom());
      }
    }

    //console.log(patient.services);
    //console.log(this.form);

    this.form.setValue({
      firstName: patient.firstName,
      lastName: patient.lastName,
      //services.serviceName :
      services: patient.services,
    });

    //console.log(this.form.value);
  }

  clear() {
    let i = this.services.length;
    while (this.services.length != 0) {
      this.services.removeAt(i);
      i--;
    }

    this.form.reset();
  }

  clearForm() {
    this.services.clear();
  }

  servicesFrom() {
    return this.fb.group({
      sid: [null],
      serviceName: [null],
      fees: [null],
    });
  }

  onSave() {
    //console.log(this.form.getRawValue());

    this.patient = this.form.getRawValue();

    let pt: Patient = this.form.value as Patient;
    console.log(pt);

    this.addPatient(pt);
  }

  addNewServices() {
    this.services.push(this.servicesFrom());
  }

  removeServices(i: Required<number>) {
    this.services.removeAt(i);
  }

  reloadOn() {
    this.getPatient();
  }

  clickFunction() {
    alert('clicked');
  }

  // ----------------------------------------------------------------------------------------
  public getPatient() {
    //console.log('getPatient() executed ');
    this.service
      .getPatient()
      .subscribe((response) => (this.resp = <Status>response));
  }

  public getServices() {
    this.service
      .getServices()
      .subscribe((response) => (this.result = <Status>response));
  }

  public addPatient(pt: Patient) {
    this.service
      .addPatient(pt)
      .subscribe((response) => (this.resp = <Status>response));
    //this.creatForm();
    this.reloadOn();
  }

  public updatePatient() {
    let pt: Patient = this.form.value as Patient;
    for (let i = 0; i < pt.services.length; i++) {
      if (pt.services[i].sid != null) {
        let num = null;
        delete pt.services[i].sid;
      }
    }

    this.service
      .updatePatient(this.editPatient.pid, pt)
      .subscribe((response) => (this.resp = <Status>response));
  }

  public deletePatient(pid: number) {
    this.service
      .deletePatient(pid)
      .subscribe((response) => (this.resp = <Status>response));
    this.reloadOn();
  }

  public deleteAllPatients() {
    console.log('function all delete called');
    this.service
      .deleteAllPatients()
      .subscribe((response) => (this.resp = <Status>response));
    this.reloadOn();
  }

  public searchPatient(key: string): void {
    const out: Patient[] = [];
    for (const pt of this.resp.patient) {
      if (
        pt.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1 ||
        pt.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      ) {
        out.push(pt);
      }
    }
    this.resp.patient = out;
    if (out.length === 0 || !key) {
      this.getPatient();
    }
  }
}
