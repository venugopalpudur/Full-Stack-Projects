import { Services } from './Services';

export class Patient {
  pid!: number;
  firstName!: string;
  lastName!: string;
  services!: Services[];
  //services!: Set<Services>;
  constructor(
    pid: number,
    firstName: string,
    lastName: string,
    services: Services[]
    //services: Set<Services> = new Set<Services>()
  ) {}
}
