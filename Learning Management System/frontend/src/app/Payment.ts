export class Payment {
  amount!: number;
  remarks!: string;

  constructor(amount: number, remarks: string) {
    this.amount = amount;
    this.remarks = remarks;
  }
}
