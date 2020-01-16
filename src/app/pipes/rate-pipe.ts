import { Pipe, PipeTransform } from '@angular/core'
import { Course } from '../interfaces/course'
import { CoursesService } from '../courses.service';


@Pipe({ name: 'ratePipe' })
export class RatePipe implements PipeTransform {
	constructor(private coursesService: CoursesService) { }

	transform(courses: Course[], filterValues: number[]): Course[] {
		if (!filterValues.length)
			return courses;
		
		return courses.filter(c => filterValues.includes(this.calculateRating(c)));
	}

	calculateRating(c : Course) : number {
		return Math.floor(this.coursesService.getAvgRate(c));
	  }
}