import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseComponent } from './course/course.component';
import { RatingModule } from 'ng-starrating';
import { ToastrModule } from 'ngx-toastr';
import { MockDataComponent } from './mock-data/mock-data.component';
import { CourseAddFormComponent } from './course-add-form/course-add-form.component'
import { ReactiveFormsModule } from '@angular/forms';
import { CourseFilterComponent } from './course-filter/course-filter.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    NavbarComponent,
    CourseComponent,
    MockDataComponent,
    CourseAddFormComponent,
    CourseFilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RatingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
