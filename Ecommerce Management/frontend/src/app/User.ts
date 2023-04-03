import { Address } from './Address';
import { Role } from './Role';

export class User {
  name!: string;
  surname!: string;
  username!: string;
  email!: string;
  phone!: string;
  password!: string;
  roles!: Role[];
  customerBillingAddress!: Address;
  customerShippingAddress!: Address;
  constructor(
    name: string,
    surname: string,
    username: string,
    email: string,
    phone: string,
    password: string,
    roles: Role[],
    customerBillingAddress: Address,
    customerShippingAddress: Address
  ) {
    this.name = name;
    this.surname = surname;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.password = password;
    this.roles = roles;
    this.customerBillingAddress = customerBillingAddress;
    this.customerShippingAddress = customerShippingAddress;
  }
}
