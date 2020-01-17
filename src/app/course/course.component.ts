import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../interfaces/course';
import { CoursesService } from '../courses.service';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-course',
	templateUrl: './course.component.html',
	styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

	@Input('course') course: Course;
	@Output() onDeleteSignal = new EventEmitter<Course>();

	constructor(
		private messageService: MessageService,
		private coursesService: CoursesService
		) { }

	ngOnInit() {
	}

	calculateRating(): number {
		return this.coursesService.getAvgRate(this.course);
	}

	onRate($event: { oldValue: number, newValue: number }) {
		let ent = {
			rate: $event.newValue,
			userId: "0" //tu bedzie chyba jakis userid
		};
		this.course.ratings.push(ent);
		this.messageService.success("Zapisano ocene (" + ent.rate + ")")
	}

	checkIfRated(): boolean {
		return this.course.ratings.find(entry => entry != undefined && entry.userId === "0" /* tu tez bedzie userid */) != undefined;
	}


	onDelete(): void {
		this.onDeleteSignal.emit(this.course);
	}
}
