export class Role {
  userRole!: string;
  description!: string;

  constructor(userRole: string, description: string) {
    this.userRole = userRole;
    this.description = description;
  }
}
