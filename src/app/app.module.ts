import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CourseComponent } from './course/course.component';
import { RatingModule } from 'ng-starrating';
import { ToastrModule } from 'ngx-toastr';
import { MockDataComponent } from './mock-data/mock-data.component';
import { CourseAddFormComponent } from './course-add-form/course-add-form.component'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CourseFilterComponent } from './course-filter/course-filter.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { FilterPipe } from './pipes/filter-pipe'
import { CourseDetailsComponent } from './course-details/course-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import { LoginPanelComponent } from './login-panel/login-panel.component';
import { RegisterPanelComponent } from './register-panel/register-panel.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { LoggedGuard, NotLoggedGuard } from './auth.guard';
import { EditCourseFormComponent } from './edit-course-form/edit-course-form.component'
import { AngularFirestoreModule } from 'angularfire2/firestore'; 

const routes: Routes = [
	{ path: 'dashboard', component: CoursesListComponent },
	{ path: '', redirectTo:'/dashboard', pathMatch: 'full'  },
	{ path: 'details/:id', component: CourseDetailsComponent, canActivate: [NotLoggedGuard] },
	{ path: 'login', component: LoginPanelComponent, canActivate: [LoggedGuard] },
	{ path: 'register', component: RegisterPanelComponent, canActivate: [LoggedGuard] },
	{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
	declarations: [
		AppComponent,
		CoursesListComponent,
		NavbarComponent,
		CourseComponent,
		MockDataComponent,
		CourseAddFormComponent,
		CourseFilterComponent,
		FilterPipe,
		CourseDetailsComponent,
		PageNotFoundComponent,
		LoginPanelComponent,
		RegisterPanelComponent,
		EditCourseFormComponent
	],
	imports: [
		BrowserModule,
		NgxNavbarModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		RouterModule.forRoot(routes),
		BrowserAnimationsModule,
		NgMultiSelectDropDownModule.forRoot(),
		ToastrModule.forRoot(),
		RatingModule,
		ReactiveFormsModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
