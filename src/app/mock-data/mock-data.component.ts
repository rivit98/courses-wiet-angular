import { Component } from '@angular/core';
import { Course, CourseType } from '../interfaces/course';
import { RateEntry } from '../interfaces/ratings';

@Component({
	selector: 'app-mock-data',
	templateUrl: './mock-data.component.html',
	styleUrls: ['./mock-data.component.css']
})
export class MockDataComponent {

	public static courses_mock: Course[] = [
		{
			id: "1",
			name: "wdi",
			ects: 6,
			semester: 1,
			type: CourseType.Lecture,
			studentsLimit: 0,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "2",
			name: "asd",
			ects: 4,
			semester: 2,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "3",
			name: "fizyka",
			ects: 5,
			semester: 2,
			type: CourseType.Excercise,
			studentsLimit: 200,
			ratings: [
				
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "4",
			name: "dyskretna",
			ects: 3,
			semester: 1,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "5",
			name: "analiza",
			ects: 6,
			semester: 1,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "6",
			name: "wdai",
			ects: 2,
			semester: 3,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "7",
			name: "bazy danych",
			ects: 4,
			semester: 3,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "8",
			name: "programowanie funkcyjne",
			ects: 2,
			semester: 3,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "9",
			name: "programowanie obiektowe",
			ects: 3,
			semester: 5,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 1,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "10",
			name: "statystyka",
			ects: 4,
			semester: 4,
			type: CourseType.Lecture,
			studentsLimit: 200,
			ratings: [
				{
					rate: 5,
					userId: "1"
				},
				{
					rate: 2,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		},
		{
			id: "11",
			name: "algebra",
			ects: 2,
			semester: 4,
			type: CourseType.Excercise,
			studentsLimit: 100,
			ratings: [
				{
					rate: 5,
					userId: "1"
				},
				{
					rate: 5,
					userId: "1"
				},
				{
					rate: 3,
					userId: "1"
				},
				{
					rate: 4,
					userId: "1"
				}
			],
			image: "https://www.wykop.pl/cdn/c3201142/comment_f67FA8qjhTKoEvTM0YbAVN4ZZbAoO5w1.jpg",
			description: "opis"
		}
	];


	constructor() {
		
	}
}
