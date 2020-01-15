import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { CoursesService } from '../courses.service';
import { FilterInterface } from '../interfaces/filterInterface';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

  coursesList: Array<Course>;
  filterCriteria: FilterInterface;

  constructor(private courseService: CoursesService) { 
    this.filterCriteria = {
      ectsValues: [],
      rateValues: [],
      semesterValues: [],
      textValue: ""
    }    
  }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() : void {
    this.courseService.getCourses().subscribe(courses => this.coursesList = courses);
  }

  onDeleteSignal(crs : Course) : void{
    this.courseService.deleteCourse(crs);
  }

  filterChanged(filterCriteria : FilterInterface) : void{
    this.filterCriteria = filterCriteria;
  }
}
