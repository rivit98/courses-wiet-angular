import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { MessageService } from './message.service';

export interface Credentials {
	email: string;
	password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
	readonly authState$: Observable<User | null> = this.fireAuth.authState;

	constructor(
		private fireAuth: AngularFireAuth,
		private router: Router,
		private messageService: MessageService
		) { }

	get user(): User | null {
		return this.fireAuth.auth.currentUser;
	}

	login(email, password) {
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);

		return new Promise<any>((resolve, reject) => {
			this.fireAuth.auth.signInWithEmailAndPassword(email, password)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res))
				resolve(res);
				let dt = new Date(res.user.metadata.lastSignInTime);
				this.messageService.success("Ostatnia wizyta " + dt.toLocaleString())
			})
			.catch((err) => reject(err))
		})
	}

	register (email : string, password) {
		return new Promise<any>((resolve, reject) => {
			this.fireAuth.auth.createUserWithEmailAndPassword(email, password)
			.then((res) => {
				localStorage.setItem('user', JSON.stringify(res));
				resolve(res);
				this.messageService.success("Konto założone pomyślnie!");
			})
			.catch((err) => reject(err))
		})
	}

	logout() {
		return this.fireAuth.auth.signOut().then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['/dashboard']);
			this.messageService.success("Wylogowano");
		})
	}
}