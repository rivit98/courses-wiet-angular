import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterInterface } from './interfaces/filterInterface';

@Injectable({
	providedIn: 'root'
})
export class FilterService {

	filterCriteria$ = new Subject<FilterInterface>();

	constructor() { }

	setFilterCriteria(fr : FilterInterface){
		this.filterCriteria$.next(fr)
	}
}
