import { Pipe, PipeTransform } from '@angular/core'
import { Course } from '../interfaces/course'


@Pipe({ name: 'ectsPipe' })
export class EctsPipe implements PipeTransform {
	transform(courses: Course[], filterValues: number[]): Course[] {

		if (!filterValues.length)
			return courses;
		
		return courses.filter(c => filterValues.includes(c.ects));
	}
}