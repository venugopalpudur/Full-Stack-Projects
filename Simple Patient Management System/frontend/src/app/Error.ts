export class Error {
  errorType!: string;
  title!: string;
  detail!: string;
  constructor(errorType: string, title: string, detail: string) {}
}
