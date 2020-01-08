import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  coursesList: Array<Course>;

  constructor(private courseService: CoursesService) { 
    
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() : void {
    this.coursesList = this.courseService.getCourses();
  }

  

}
