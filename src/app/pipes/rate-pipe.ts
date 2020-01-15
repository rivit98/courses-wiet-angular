import { Pipe, PipeTransform } from '@angular/core'
import { Course } from '../interfaces/course'


@Pipe({ name: 'ratePipe' })
export class RatePipe implements PipeTransform {
	transform(courses: Course[], filterValues: number[]): Course[] {
		if (!filterValues.length)
			return courses;
		
		return courses.filter(c => filterValues.includes(this.calculateRating(c)));
	}

	//duplicating functionality :/ this should be part of course interface
	calculateRating(c : Course) : number {
		let res = 0;
		if(c.ratings.length > 0){
		  res = c.ratings.map(a => a.rate.valueOf()).reduce((a, b) => a + b) / c.ratings.length;
		}
		return Math.floor(res);
	  }
}