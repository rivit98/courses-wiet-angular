export class FilterInterface{
	ectsValues: number[];
	rateValues: number[];
	semesterValues: number[];
	textValue: string;

	constructor(){
		this.ectsValues = []
		this.semesterValues = []
		this.rateValues = []
		this.textValue = ""
	}
}