import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../interfaces/course';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-course-details',
	templateUrl: './course-details.component.html',
	styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

	course: Course;
	currentRating: number;

	constructor(
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.course = this.coursesService.getCourse(id);

		if (!this.course) {
			this.router.navigate(['/dashboard']);
		}
		this.calculateRating();
	}

	calculateRating(){
		this.currentRating = this.coursesService.getAvgRate(this.course);
	}

	checkIfRated(): boolean {
		if(this.course.ratings.find(entry => entry != undefined && entry.userId === "0" /* tu tez bedzie userid */) != undefined){
			// this.toastrService.error("Oceniałeś już ten kurs!", "", {
			// 	positionClass: 'toast-bottom-right'
			// });
			return true;
		}
		return false;
	}

	onRate($event: { oldValue: number, newValue: number }) {
		let ent = {
			rate: $event.newValue,
			userId: "0" //tu bedzie chyba jakis userid
		};
		this.course.ratings.push(ent);
		this.toastrService.success("Zapisano ocene (" + ent.rate + ")", "", {
			positionClass: 'toast-bottom-right'
		});

		this.calculateRating();
	}
}
