import { Address } from './../Address';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { authService } from '../services/authService.service';
import { auth } from './../auth';
import { NavigationExtras, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { User } from './../User';
import { Role } from '../Role';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private services: ServicesService,
    private authService: authService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //this.creatForm();
    this.services.Refreshrequired.subscribe((item) => {});
  }

  form!: FormGroup;
  signup: User | undefined;
  resp: any | undefined;
  role: Role | undefined;

  saveUsername!: boolean;

  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
  }

  register(loginForm: NgForm) {
    let role;
    let roleArr = new Array();
    let customerBillingAddress = new Address(
      loginForm.value.doorNo,
      loginForm.value.streetName,
      loginForm.value.layout,
      loginForm.value.city,
      loginForm.value.pincode
    );
    let customerShippingAddress;
    if (this.saveUsername) {
      customerShippingAddress = new Address(
        loginForm.value.doorNo,
        loginForm.value.streetName,
        loginForm.value.layout,
        loginForm.value.city,
        loginForm.value.pincode
      );
    } else {
      customerShippingAddress = new Address(
        loginForm.value.shippingDoorNo,
        loginForm.value.shippingStreetName,
        loginForm.value.shippingLayout,
        loginForm.value.shippingCity,
        loginForm.value.shippingPincode
      );
    }

    if (loginForm.value.role == 'Teacher') {
      role = new Role(loginForm.value.role, 'Teacher can create a courses');
      roleArr.push(role);
    } else {
      role = new Role(loginForm.value.role, 'Default User Role');
      roleArr.push(role);
    }
    let user = new User(
      loginForm.value.name,
      loginForm.value.surname,
      loginForm.value.username,
      loginForm.value.email,
      loginForm.value.phone,
      loginForm.value.password,
      roleArr,
      customerBillingAddress,
      customerShippingAddress
    );
    console.log(user);

    this.services.register(user).subscribe(
      (response: any) => {
        this.signup = response;

        this.router.navigate(['/mail-sent'], {
          state: { state: true, email: user.email, name: user.name },
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //-------------------------------------------------------------------
  /*
  edit(user: User) {
    this.signup = user;
    this.signup.roles = Array.from(this.signup.roles);
  }

  creatForm() {
    this.form = this.fb.group({
      name: [null],
      surname: [null],
      username: [null],
      email: [null],
      phone: [null],
      password: [null],
      roles: this.fb.array([this.rolesFrom()]),
    });
  }

  get roles() {
    return this.form.get('roles') as FormArray;
  }

  patchForm(user: User) {
    this.clearForm();
    if (user.roles != null) {
      for (let i = 0; i < user.roles.length; i++) {
        this.roles.push(this.rolesFrom());
      }
    }
    this.form.setValue({
      name: user.name,
      surname: user.surname,
      username: user.username,
      email: user.email,
      phone: user.phone,
      password: user.password,
      roles: user.roles,
    });
  }

  clear() {
    let i = this.roles.length;
    while (this.roles.length != 0) {
      this.roles.removeAt(i);
      i--;
    }

    this.form.reset();
  }

  clearForm() {
    this.roles.clear();
  }

  rolesFrom() {
    return this.fb.group({
      userRole: [null],
      description: [null],
    });
  }

  onSave() {
    this.signup = this.form.getRawValue();
    let user: User = this.form.value as User;
    console.log(user);
    this.registration(user);
  }

  addNewRoles() {
    this.roles.push(this.rolesFrom());
  }

  removeRoles(i: Required<number>) {
    this.roles.removeAt(i);
  }

  reloadOn() {
    this.getPatient();
  }

  clickFunction() {
    alert('clicked');
  }

  public registration(user: User) {
    this.services
      .register(user)
      .subscribe((response) => (this.resp = response));
    //this.reloadOn();
  }*/
}
