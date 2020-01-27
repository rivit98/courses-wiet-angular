import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CoursesService } from '../courses.service';
import { CourseType, Course } from '../interfaces/course'
import { MessageService } from '../message.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-course-add-form',
	templateUrl: './course-add-form.component.html',
	styleUrls: ['./course-add-form.component.css']
})
export class CourseAddFormComponent implements OnInit {

	public CourseType = CourseType;
	addForm: FormGroup;
	submitted = false;

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
		private messageService: MessageService
		) { }

	ngOnInit() {
		this.addForm = this.formBuilder.group({
			name: ['', Validators.required],
			desc: ['', Validators.required],
			ects: ['', [Validators.required, Validators.min(0), Validators.max(10), Validators.pattern(/^[0-9]*$/)]],
			semester: ['', [Validators.required, Validators.min(1), Validators.max(7), Validators.pattern(/^[0-9]*$/)]],
			type: ['', Validators.required],
			studentsLimit: ['', [Validators.required, Validators.min(0), Validators.max(1000), Validators.pattern(/^[0-9]*$/)]],
			image: ['']
		});

	}

	get f() { return this.addForm.controls; }

	objectKeys(obj) {
		return Object.keys(obj);
	}

	onSubmit(): void {
		this.submitted = true;

		if (this.addForm.invalid) {
			return;
		}

		let addForm = this.addForm.controls;

		let toAdd: Course = {
			name: addForm.name.value,
			ects: addForm.ects.value,
			semester: addForm.semester.value,
			type: CourseType[addForm.type.value], //tu bedzie sypac bledami 100%
			studentsLimit: addForm.studentsLimit.value,
			image: (addForm.image == null || addForm.image.value == "") ?
					"https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg" : // i know, hardcoding stuff
					addForm.image.value,
			description: addForm.desc.value,
			ratings: [],
			enrolledUsers: []
		}
		this.messageService.success("Kurs dodany!")
		this.coursesService.addCourse(toAdd);
	}

	onReset(): void {
		this.submitted = false;
		this.addForm.reset();
	}

}