import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Course } from './interfaces/course';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService {

	readonly COLLECTION: string = "kursy"

	constructor(private firestore: AngularFirestore) { }

	getdata() {
		return this.firestore.collection(this.COLLECTION).snapshotChanges();
	}

	createdata(course: Course) {
		delete course.id
		return this.firestore.collection(this.COLLECTION).add(course);
	}

	updatedata(course: Course) {
		let id = course.id
		delete course.id
		this.firestore.collection(this.COLLECTION).doc(id).update(course);
	}

	deletedata(id: string) {
		return this.firestore.collection(this.COLLECTION).doc(id).delete()
	}
}
