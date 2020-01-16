import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

	constructor(
		private router: Router,
		private authService: AuthService,
		private toastrService: ToastrService
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.authService.authState$.pipe(map(state => {
			if (state !== null) { return true; }

			this.toastrService.error("Musisz być zalogowany ", "", {
				positionClass: 'toast-bottom-right'
			});
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