export class Password {
  oldPassword!: string;
  newPassword!: string;
  confirmNewPassowrd!: string;
  constructor(
    oldPassword: string,
    newPassword: string,
    confirmNewPassowrd: string
  ) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
    this.confirmNewPassowrd = confirmNewPassowrd;
  }
}
