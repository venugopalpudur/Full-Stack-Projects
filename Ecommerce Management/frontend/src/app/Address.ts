export class Address {
  doorNo!: string;
  streetName!: string;
  layout!: string;
  city!: string;
  pincode!: string;
  constructor(
    doorNo: string,
    streetName: string,
    layout: string,
    city: string,
    pincode: string
  ) {
    this.doorNo = doorNo;
    this.streetName = streetName;
    this.layout = layout;
    this.city = city;
    this.pincode = pincode;
  }
}
