import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CoursesService } from '../courses.service';
import { FilterInterface } from '../interfaces/filterInterface'
import { Course } from '../interfaces/Course'


@Component({
	selector: 'app-course-filter',
	templateUrl: './course-filter.component.html',
	styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit {

	@Output() filterCriteriaChanged = new EventEmitter<FilterInterface>();

	constructor(private coursesService: CoursesService) { }

	coursesList: Array<Course>; //to jest zduplikowane wzgledem courses-list, pomyslec jak to zrobic inaczej i czy sie da wgl inaczej
								//potrzebne do otrzymania listy kursow, zeby dynamiczne parametry filtrowania zrobic
	dropdownEcts = [];
	selectedEcts: number[] = [];

	dropdownRate = [];
	selectedRate: number[] = [];

	dropdownSemester = [];
	selectedSemester: number[] = [];

	searchText: string = "";

	dropdownSettings: IDropdownSettings = {};

	ngOnInit() {
		this.coursesService.getCourses().subscribe(courses => this.coursesList = courses);

		this.dropdownSettings = {
			idField: 'val',
			textField: 'text',
			enableCheckAll: false//,
			// unSelectAllText: "Wyczyść",
			// selectAllText: "Wszystkie"
		};

		this.fillArray(this.dropdownEcts, 'ects');
		// this.fillArray(this.dropdownRate, 'rate');
		this.fillArray(this.dropdownSemester, 'semester');
		for (let i of [1, 2, 3, 4, 5]) {
			this.pushToArray(this.dropdownRate, i);
		}
	}

	resetSelection(){
		this.selectedEcts = [];
		this.searchText = "";
		this.selectedRate = [];
		this.selectedSemester = [];
		this.emitFilterCriteria();
	}

	onItemSelect() {
		this.emitFilterCriteria();
	}

	onSearchChange() {
		this.emitFilterCriteria();
	}

	emitFilterCriteria() : void {
		this.filterCriteriaChanged.emit({
			ectsValues: this.selectedEcts.map(i => i['val']),
			rateValues: this.selectedRate.map(i => i['val']),
			semesterValues: this.selectedSemester.map(i => i['val']),
			textValue: this.searchText
		});
	}

	getUniqueData(what: string) {
		return this.coursesList.map(a => a[what]).filter((item, i, ar) => ar.indexOf(item) === i).sort();
	}

	fillArray(arr, what: string): void {
		for (let c of this.getUniqueData(what)) {
			this.pushToArray(arr, c);
		}
	}

	pushToArray(arr, what: number) {
		arr.push({
			val: what,
			text: what
		})
	}

}
