import { Injectable, OnInit } from '@angular/core';
import { Course } from './interfaces/course';
import { MockDataComponent } from './mock-data/mock-data.component';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators'
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

@Injectable({
	providedIn: 'root'
})
export class CoursesService implements OnInit {

	courses: Course[];

	constructor(private fireCloudService: FirestoreService
	) {
		// this.courses = MockDataComponent.courses_mock; ////////////////////////
		// this.courses.forEach(c => c.enrolledUsers = []) //quick fix

		// MockDataComponent.courses_mock.forEach(c => {
		// 	fireCloudService.createdata(c)
		// })

		this.getCourses().subscribe(data => {
			this.courses = data;
		})
	}

	ngOnInit() {

	}

	getCourses(): Observable<Course[]> {
		return this.fireCloudService.getdata().pipe(map(entry => {
			return entry.map(doc =>{
				const docData = doc.payload.doc.data() as Course;
				return { id: doc.payload.doc.id , ...docData } as Course;
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
		this.fireCloudService.createdata(crs);
	}

	deleteCourse(crs: Course): void {
		this.fireCloudService.deletedata(crs.id)
		console.log(crs.id)
	}

	editCourse(crs: Course){
		this.fireCloudService.updatedata(crs)
	}

	getAvgRate(c: Course): number {
		let res = 0;
		if (c.ratings.length > 0) {
			res = c.ratings.map(a => a.rate.valueOf()).reduce((a, b) => a + b) / c.ratings.length;
		}
		return Math.round(res * 100) / 100;
	}
}
