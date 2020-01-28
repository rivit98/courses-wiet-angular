import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, Role } from './interfaces/user';
import { Observable, BehaviorSubject } from 'rxjs/index';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MessageService } from './message.service';
import { FirestoreService } from './firestore.service';


@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private userSubject: BehaviorSubject<User>
	private currentUser: Observable<User>

	constructor(
		private fireAuth: AngularFireAuth,
		private router: Router,
		private messageService: MessageService,
		private fireCloudService: FirestoreService
	) {
		let user = JSON.parse(localStorage.getItem('user'));
		this.userSubject = new BehaviorSubject<User>(null);
		this.currentUser = this.userSubject.asObservable()

		this.fireAuth.authState.subscribe(user => {
			if (user) {
				this.setUserData(user)
				localStorage.setItem('user', JSON.stringify(user));
			} else {
				this.userSubject.next(null)
				localStorage.removeItem('user')
			}
		})
	}

	get user(): Observable<User | null> {
		return this.currentUser;
	}

	getCurrentUser() {
		return this.userSubject.value;
	}

	isLogged(): boolean {
		return localStorage.getItem('user') !== null;
	}

	async login(email: string, password: string) {
		await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

		const res = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
		let dt = new Date(res.user.metadata.lastSignInTime);
		this.messageService.success("Ostatnia wizyta " + dt.toLocaleString());
	}

	async register(email: string, password: string) {
		await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
		this.fireCloudService.addUser(email, Role.User)
		this.messageService.success("Konto założone pomyślnie!");
	}

	async logout() {
		await this.fireAuth.auth.signOut();
		localStorage.removeItem('user');
		this.userSubject.next(null)
		this.router.navigate(['/dashboard']);
		this.messageService.success("Wylogowano");
	}

	setUserData(user: firebase.User) {
		let usr : User = {
			id: user.uid,
			email: user.email,
			role: Role.User
		};
		this.fireCloudService.getUserRole(user.email).then(res => {
			usr.role = res;
		}).catch(err => {
			console.log(err)
		}).finally(() =>{
			this.userSubject.next(usr)
		})
	}

	isAdmin(): boolean {
		if (this.getCurrentUser() !== null) {
			return this.getCurrentUser().role === Role.Admin
		}

		return false;
	}
}