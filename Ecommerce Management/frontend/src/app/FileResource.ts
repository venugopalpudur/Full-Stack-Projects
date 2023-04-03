export class FileResource {
  id!: number;
  name!: string;
  resourceId!: string;
  url!: string;
  fileType!: string;
  size!: number;
  constructor(
    id: number,
    name: string,
    resourceId: string,
    url: string,
    fileType: string,
    size: number
  ) {}
}
