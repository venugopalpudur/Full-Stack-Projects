import { FileResource } from './FileResource';

export class Course {
  title!: string;
  description!: string;
  enrollments!: number;
  fileResource!: FileResource;
  constructor(
    title: string,
    description: string,
    enrollments: number,
    fileResource: FileResource
  ) {
    this.title = title;
    this.description = description;
    this.enrollments = enrollments;
    this.fileResource = fileResource;
  }
}
