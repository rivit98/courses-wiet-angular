import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../interfaces/course';
import { Router } from "@angular/router";
import { MessageService } from '../message.service';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-course-details',
	templateUrl: './course-details.component.html',
	styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

	course: Course;
	currentRating: number;
	ratedAlready: boolean;
	enrolledAlready: boolean;

	constructor(
		private coursesService: CoursesService,
		private route: ActivatedRoute,
		private router: Router,
		private messageService: MessageService,
		private authService: AuthService
	) { }

	ngOnInit() {
		let id = this.route.snapshot.paramMap.get('id');
		this.course = this.coursesService.getCourse(id);

		if (!this.course) {
			this.router.navigate(['/dashboard']);
		}
		this.calculateRating();
		this.ratedAlready = this.checkIfRated();
		this.enrolledAlready = this.checkEnrolled();
	}

	calculateRating() {
		this.currentRating = this.coursesService.getAvgRate(this.course);
	}

	checkIfRated(): boolean {
		return (this.course.ratings.map(e => e.userId).includes(this.authService.getCurrentUser().id));
	}

	checkEnrolled(): boolean {
		return (this.course.enrolledUsers.includes(this.authService.getCurrentUser().id));
	}

	onRate($event: { oldValue: number, newValue: number }) {
		if (!this.enrolledAlready) {
			this.messageService.error("Musisz być zapisany na kurs, aby go ocenić!");
			return;
		}

		this.ratedAlready = true;

		let ent = {
			rate: $event.newValue,
			userId: this.authService.getCurrentUser().id //tu bedzie chyba jakis userid
		};
		this.course.ratings.push(ent);
		this.messageService.success("Zapisano ocene")
		this.coursesService.addRating(this.course.id, ent)

		this.calculateRating();
	}

	onEnroll() {
		if (this.course.enrolledUsers.length >= this.course.studentsLimit) {
			this.messageService.error("Brak miejsc")
			return;
		}

		let uid = this.authService.getCurrentUser().id;

		this.course.enrolledUsers.push(uid);
		this.enrolledAlready = true;

		this.messageService.success("Zapisano pomyślnie");
		this.coursesService.enrollUser(this.course.id, uid)
	}

	onEdit(course: Course) {
		this.course = course;
	}
}
