export class Product {
  productName!: string;
  productDescription!: string;
  price!: number;
  quantity!: number;
  constructor(
    productName: string,
    productDescription: string,
    price: number,
    quantity: number
  ) {
    this.productName = productName;
    this.productDescription = productDescription;
    this.price = price;
    this.quantity = quantity;
  }
}
