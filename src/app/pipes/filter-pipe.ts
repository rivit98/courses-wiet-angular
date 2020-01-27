import { Pipe, PipeTransform } from '@angular/core'
import { Course } from '../interfaces/course'
import { FilterInterface } from '../interfaces/filterInterface';
import { CoursesService } from '../courses.service';


@Pipe({ name: 'filterPipe' })
export class FilterPipe implements PipeTransform {
	constructor(private coursesService: CoursesService) { }

	transform(courses: Course[], filterCriteria: FilterInterface): Course[] {

		let filtered = courses;

		if (filterCriteria.ectsValues.length) {
			filtered = filtered.filter(c => filterCriteria.ectsValues.includes(c.ects));
		}

		if (filterCriteria.semesterValues.length) {
			filtered = filtered.filter(c => filterCriteria.semesterValues.includes(c.semester));
		}

		if (filterCriteria.rateValues.length) {
			filtered = filtered.filter(c => filterCriteria.rateValues.includes(this.calculateRating(c)));
		}

		if (filterCriteria.textValue.length) {
			let txt = filterCriteria.textValue.toLowerCase();
			filtered = filtered.filter(c => c.name.toLowerCase().includes(txt));
		}

		return filtered;
	}

	calculateRating(c: Course): number {
		return Math.floor(this.coursesService.getAvgRate(c));
	}
}