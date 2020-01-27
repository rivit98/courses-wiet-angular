import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CoursesService } from '../courses.service';
import { FilterInterface } from '../interfaces/filterInterface'
import { Course } from '../interfaces/Course'
import { FilterService } from '../filter.service'


@Component({
	selector: 'app-course-filter',
	templateUrl: './course-filter.component.html',
	styleUrls: ['./course-filter.component.css']
})
export class CourseFilterComponent implements OnInit, OnChanges {

	@Input('filteredList') coursesList: Course[];

	constructor(private filters: FilterService) { }

	dropdownEcts = [];
	dropdownRate = [];
	dropdownSemester = [];
	
	selectedEcts: number[] = [];
	selectedRate: number[] = [];
	selectedSemester: number[] = [];
	searchText: string = "";

	dropdownSettings: IDropdownSettings = {};

	ngOnInit() {
		this.dropdownSettings = {
			idField: 'val',
			textField: 'text',
			enableCheckAll: false//,
			// unSelectAllText: "Wyczyść",
			// selectAllText: "Wszystkie"
		};

		this.dropdownRate = []
		for (let i of [1, 2, 3, 4, 5]) {
			this.pushToArray(this.dropdownRate, i);
		}
		this.prepareArrays()
	}

	ngOnChanges(changes : SimpleChanges){
		this.coursesList = changes.coursesList.currentValue
		if(!this.selectedEcts.length && !this.searchText.length && !this.selectedRate.length && !this.selectedSemester.length){
			this.prepareArrays()
		}
	}

	prepareArrays() {
		this.dropdownEcts = []
		this.dropdownSemester = []

		this.fillArray(this.dropdownEcts, 'ects');
		this.fillArray(this.dropdownSemester, 'semester');
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
		let crit : FilterInterface = new FilterInterface();
		crit.ectsValues = this.selectedEcts.map(i => i['val']);
		crit.rateValues = this.selectedRate.map(i => i['val']);
		crit.semesterValues = this.selectedSemester.map(i => i['val']);
		crit.textValue = this.searchText
		this.filters.setFilterCriteria(crit)
	}

	getUniqueData(what: string) {
		return this.coursesList
				.map(a => a[what])
				.filter((item, i, ar) => ar.indexOf(item) === i)
				.sort();
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
