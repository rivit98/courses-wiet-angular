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
import { MockDataComponent } from './mock-data/mock-data.component'

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    NavbarComponent,
    CourseComponent,
    MockDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RatingModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
