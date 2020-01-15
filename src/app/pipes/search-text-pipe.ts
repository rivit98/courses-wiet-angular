import { Pipe, PipeTransform } from '@angular/core'
import { Course } from '../interfaces/course'


@Pipe({ name: 'searchTextPipe' })
export class SearchTextPipe implements PipeTransform {
	transform(courses: Course[], filterValues: string): Course[] {

		if (!filterValues.length)
			return courses;

		filterValues = filterValues.toLowerCase();

		return courses.filter(c => c.name.toLowerCase().includes(filterValues));
	}
}