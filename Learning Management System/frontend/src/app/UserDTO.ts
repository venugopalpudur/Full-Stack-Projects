import { Role } from './Role';

export class UserDTO {
  name!: string;
  surname!: string;
  username!: string;
  email!: string;
  password!: string;
  phone!: string;
  userId!: string;
  createdCourses!: any;
  reviews!: any;
  createdDate!: string;
  updatedDate!: string;
  role!: Role[];
  registeredCourses!: any;
  notifications!: any;
  locked!: boolean;
  accountExpired!: boolean;
  credentialsExpired!: boolean;
  enabled!: boolean;
  constructor(
    name: string,
    surname: string,
    username: string,
    email: string,
    password: string,
    phone: string,
    userId: string,
    createdCourses: any,
    reviews: any,
    createdDate: string,
    updatedDate: string,
    role: Role[],
    registeredCourses: any,
    notifications: any,
    locked: boolean,
    accountExpired: boolean,
    credentialsExpired: boolean,
    enabled: boolean
  ) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.role = role;
    this.userId = userId;
    this.createdCourses = createdCourses;
    this.reviews = reviews;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.registeredCourses = registeredCourses;
    this.notifications = notifications;
    this.locked = locked;
    this.accountExpired = accountExpired;
    this.credentialsExpired = credentialsExpired;
    this.enabled = enabled;
  }
}
