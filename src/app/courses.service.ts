import { Injectable, OnInit } from '@angular/core';
import { Course } from './interfaces/course';
import { MockDataComponent } from './mock-data/mock-data.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { FirestoreService } from './firestore.service';
import { RateEntry } from './interfaces/ratings';

@Injectable({
	providedIn: 'root'
})
export class CoursesService implements OnInit {

	courses: Course[];

	constructor(
		private fireCloudService: FirestoreService
	) {
		MockDataComponent.courses_mock.forEach(c => {
			// uncomment to fill db with data
			// fireCloudService.addCourse(c)
		})

		this.getCourses().subscribe(data => {
			this.courses = data;

			// uncomment to clear db
			// this.courses.forEach(c =>{
			// 	this.fireCloudService.deleteCourse(c.id)
			// })
		})
	}

	ngOnInit() {

	}

	getCourses(): Observable<Course[]> {
		return this.fireCloudService.getCourses().pipe(map(entry => {
			return entry.map(doc => {
				const docData = doc.payload.doc.data() as Course;
				return { id: doc.payload.doc.id, ...docData } as Course;
			})
		}))
	}

	getCourse(courseId: string): Course {
		const index = this.courses.findIndex(c => c.id === courseId);
		if (index > -1) {
			return this.courses[index];
		}

		return undefined;
	}

	addCourse(crs: Course): void {
		this.fireCloudService.addCourse(crs);
	}

	deleteCourse(crs: Course): void {
		this.fireCloudService.deleteCourse(crs.id)
		console.log(crs.id)
	}

	editCourse(crs: Course) {
		this.fireCloudService.updateCourse(crs)
	}

	addRating(cid: string, rate: RateEntry) {
		this.fireCloudService.addRating(cid, rate)
	}

	enrollUser(cid: string, uid: string) {
		this.fireCloudService.enrollUser(cid, uid)
	}

	getAvgRate(c: Course): number {
		let res = 0;
		if (c.ratings.length > 0) {
			res = c.ratings.map(a => a.rate.valueOf()).reduce((a, b) => a + b) / c.ratings.length;
		}
		return Math.round(res * 100) / 100;
	}


}
