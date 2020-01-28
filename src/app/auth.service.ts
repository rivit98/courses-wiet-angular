import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User, Role } from './interfaces/user';
import { Observable, BehaviorSubject } from 'rxjs/index';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MessageService } from './message.service';


@Injectable({
	providedIn: 'root'
})

export class AuthService {
	private userSubject: BehaviorSubject<User>
	private currentUser: Observable<User>

	constructor(
		private fireAuth: AngularFireAuth,
		private router: Router,
		private messageService: MessageService
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
				localStorage.setItem('user', null);
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
		const user = JSON.parse(localStorage.getItem('user'));
		return user !== null;
	}

	async login(email: string, password: string) {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

		const res = await this.fireAuth.auth.signInWithEmailAndPassword(email, password);
		let dt = new Date(res.user.metadata.lastSignInTime);
		this.messageService.success("Ostatnia wizyta " + dt.toLocaleString());
	}

	async register(email: string, password: string) {
		const res = await this.fireAuth.auth.createUserWithEmailAndPassword(email, password);
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
		//tu get z angular document role
		this.userSubject.next({
			id: user.uid,
			email: user.email,
			role: Role.Admin
			// role: Role.User
		})
	}

	isAdmin(): boolean {
		if (this.getCurrentUser() !== null) {
			return this.getCurrentUser().role === Role.Admin
		}

		return false;
	}
}