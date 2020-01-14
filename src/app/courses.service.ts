import { Injectable } from '@angular/core';
import { Course } from './interfaces/course';
import { MockDataComponent } from './mock-data/mock-data.component';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Array<Course>;
  
  constructor() { 
    this.courses = MockDataComponent.courses_mock;
  }

  getCourses(): Array<Course>{
    return this.courses;
  }

  getCourse(courseId : number) : Course{
    const index = this.courses.findIndex(c => c.id === courseId);
    if (index > -1) {
      return this.courses[index]
    }

    return undefined;
  }

  addCourse(crs : Course) : void{
    this.courses.push(crs);
  }

  deleteCourse(crs : Course) : void{
    const index = this.courses.indexOf(crs, 0);
    if (index > -1) {
      this.courses.splice(index, 1);
    }
  }


}
