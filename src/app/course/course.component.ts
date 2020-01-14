import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../interfaces/course';
import { StarRatingComponent } from 'ng-starrating';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  @Input('course') course: Course;
  @Output() onDeleteSignal = new EventEmitter<Course>();

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
  }

  calculateRating() : number {
    let res = 0;
    if(this.course.ratings.length > 0){
      res = this.course.ratings.map(a => a.rate.valueOf()).reduce((a, b) => a + b) / this.course.ratings.length;
    }
    return Math.round( res * 100 ) / 100;
  }

  getImageAsBase64() : string {
    //TODO: get image from disk/net and convert to base64
    return this.course.image;
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    let ent = {
      rate: $event.newValue,
      userId: 0 //tu bedzie chyba jakis userid
    };
    this.course.ratings.push(ent);
    this.toastrService.success("Zapisano ocene ("+ ent.rate + ")", "", {
      positionClass: 'toast-bottom-right'
    });
  }

  checkIfRated() : boolean{
    return this.course.ratings.find(entry => entry != undefined && entry.userId === 0 /* tu tez bedzie userid */) != undefined;
  }

  
  onDelete() : void{
    this.onDeleteSignal.emit(this.course);
  }
}
