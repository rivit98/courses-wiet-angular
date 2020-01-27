import { Component, OnInit, Input, OnChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { CourseType, Course } from '../interfaces/course'
import { Router } from '@angular/router';
import { MessageService } from '../message.service';

@Component({
	selector: 'app-edit-course-form',
	templateUrl: './edit-course-form.component.html',
	styleUrls: ['./edit-course-form.component.css']
})
export class EditCourseFormComponent implements OnInit, OnChanges {

	@Input('currentCourse') course : Course
	@Output() onEditSignal = new EventEmitter<Course>();

	public CourseType = CourseType;
	editForm: FormGroup;
	submitted = false;
	defaultValue = CourseType.Excercise;

	validationErrorsMsg = {
		name: {
			required: "To pole jest wymagane",
		},
		desc: {
			required: "To pole jest wymagane"
		},
		ects: {
			required: "To pole jest wymagane",
			max: "Dozwolone wartosci [0;10]",
			min: "Dozwolone wartosci [0;10]",
			pattern: "Podaj liczbę"
		},
		semester: {
			required: "To pole jest wymagane",
			max: "Dozwolone wartosci [0;7]",
			min: "Dozwolone wartosci [0;7]",
			pattern: "Podaj liczbę"
		},
		type: {
			required: "To pole jest wymagane"
		},
		studentsLimit: {
			required: "To pole jest wymagane",
			max: "Musi być mniejsze od 1000",
			min: "Musi być większe od 0",
			pattern: "Podaj liczbę"
		},
		image: {

		}
	}

	constructor(
		private formBuilder: FormBuilder,
		private coursesService: CoursesService,
		private messageService: MessageService,
		private router: Router) { }

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			name: [this.course.name, Validators.required],
			desc: [this.course.description, Validators.required],
			ects: [this.course.ects, [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern(/^[0-9]*$/)]],
			semester: [this.course.semester, [Validators.required, Validators.min(1), Validators.max(7), Validators.pattern(/^[0-9]*$/)]],
			type: [this.course.type, Validators.required],
			studentsLimit: [this.course.studentsLimit, [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern(/^[0-9]*$/)]],
			image: [this.course.image]
		});
	}

	ngOnChanges(){
		this.defaultValue = this.course.type;
	}

	get f() { return this.editForm.controls; }

	objectKeys(obj) {
		return Object.keys(obj);
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.editForm.invalid) {
			return;
		}

		let editForm = this.editForm.controls;

		let toAdd: Course = {
			id: this.course.id,
			name: editForm.name.value,
			ects: editForm.ects.value,
			semester: editForm.semester.value,
			type: editForm.type.value,
			studentsLimit: editForm.studentsLimit.value,
			image: (editForm.image == null || editForm.image.value == "") ?
				"https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg" : // i know, hardcoding stuff
				editForm.image.value,
			description: editForm.desc.value,
			ratings: this.course.ratings,
			enrolledUsers: this.course.enrolledUsers
		}
		this.course = toAdd

		this.messageService.success("Kurs edytowany!");
		this.coursesService.editCourse(toAdd);
		this.onEditSignal.emit(toAdd);
	}

	onReset(): void {
		this.submitted = false;
		this.editForm.reset();
	}
}