import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
		private messageService: MessageService,
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.authState$.pipe(map(state => {
			if (state !== null) { return true; }

			this.messageService.error("Musisz być zalogowany")
			this.router.navigate(['dashboard']);

			return false;
		}
		)
		);
	}
}

@Injectable({
	providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.authState$.pipe(map(state => {
			if (state !== null) {
				this.router.navigate(['dashboard']);
				return false;
			}

			return true;
		}
		)
		);
	}
}