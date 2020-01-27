import { Component, OnInit } from '@angular/core';
import { Course } from '../interfaces/course';
import { CoursesService } from '../courses.service';
import { FilterInterface } from '../interfaces/filterInterface';
import { FilterService } from '../filter.service';
import { FilterPipe } from '../pipes/filter-pipe'
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-courses-list',
	templateUrl: './courses-list.component.html',
	styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

	coursesList: Array<Course>;
	filterCriteria: FilterInterface;

	constructor(
		private courseService: CoursesService,
		private filters: FilterService,
		private authService: AuthService
	) {
		this.filterCriteria = new FilterInterface()
	}

	ngOnInit() {
		this.courseService.getCourses().subscribe(courses => {
			this.coursesList = courses
		});

		this.filters.filterCriteria$.subscribe(fr => {
			this.filterCriteria = fr
		})
	}

	onDeleteSignal(crs: Course): void {
		if(this.authService.isAdmin()){
			this.coursesList = this.coursesList.filter(c => c.id !== crs.id)
			this.courseService.deleteCourse(crs);
		}
	}
}
