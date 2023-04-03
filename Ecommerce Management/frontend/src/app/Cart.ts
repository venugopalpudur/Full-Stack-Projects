import { Item } from './Item';

export class Cart {
  items!: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }
}
