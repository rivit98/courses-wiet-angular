import { RateEntry } from './ratings'

export enum CourseType{
	Lab = "Laboratorium",
	Lecture = "Wykład",
	Excercise = "Ćwiczenia",
	Project = "Projekt"
}

export interface Course{
	id?: string,
	name: string,
	ects: number,
	semester: number,
	type: CourseType,
	studentsLimit: number,
	ratings: RateEntry[],
	image: string,
	description: string,
	enrolledUsers: string[]
}