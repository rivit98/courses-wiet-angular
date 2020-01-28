import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Course } from './interfaces/course';
import { RateEntry } from './interfaces/ratings';
import * as firebase from 'firebase';
import { Role } from './interfaces/user';
import { resolve } from 'url';

@Injectable({
	providedIn: 'root'
})
export class FirestoreService {

	private readonly COURSES_COLLECTION: string = "kursy";
	private readonly USERS_COLLECTION: string = "users";

	constructor(private firestore: AngularFirestore) { }

	getCourses() {
		return this.firestore.collection(this.COURSES_COLLECTION).snapshotChanges();
	}

	addCourse(course: Course) {
		delete course.id
		return this.firestore.collection(this.COURSES_COLLECTION).add(course);
	}

	updateCourse(course: Course) {
		let id = course.id
		delete course.id
		this.firestore.collection(this.COURSES_COLLECTION).doc(id).update(course);
	}

	deleteCourse(id: string) {
		return this.firestore.collection(this.COURSES_COLLECTION).doc(id).delete()
	}

	addRating(id: string, rate: RateEntry) {
		this.firestore.collection(this.COURSES_COLLECTION).doc(id).update({
			ratings: firebase.firestore.FieldValue.arrayUnion(rate)
		})
	}

	enrollUser(id: string, uid: string) {
		this.firestore.collection(this.COURSES_COLLECTION).doc(id).update({
			enrolledUsers: firebase.firestore.FieldValue.arrayUnion(uid)
		})
	}

	/////////////////////////////////////////////////////////////////////////

	addUser(email: string, role: Role){
		this.firestore.collection(this.USERS_COLLECTION).doc(email).set({
			role: role
		})
	}

	async getUserRole(email : string) : Promise<Role>{
		const documentRef = this.firestore.collection(this.USERS_COLLECTION).doc(email);

		if(documentRef == null){
			return Promise.resolve(Role.User);
		}

		let doc = await documentRef.ref.get()
		const docData = doc.data()
		
		if(docData == null){
			return Role.User
		}

		return docData.role
	}
}
