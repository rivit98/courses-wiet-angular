import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs/index';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

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
		private toastrService: ToastrService
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
				this.toastrService.success("Ostatnia wizyta " + dt.toLocaleString(), "", {
					positionClass: 'toast-bottom-right'
				});
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
				this.toastrService.success("Konto założone pomyślnie!", "", {
					positionClass: 'toast-bottom-right'
				});
			})
			.catch((err) => reject(err))
		})
	}

	logout() {
		return this.fireAuth.auth.signOut().then(() => {
			localStorage.removeItem('user');
			this.router.navigate(['/dashboard']);
			this.toastrService.success("Wylogowano", "", {
				positionClass: 'toast-bottom-right'
			});
		})
	}
}