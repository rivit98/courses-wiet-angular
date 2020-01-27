import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MessageService } from './message.service';

@Injectable({
	providedIn: 'root'
})
export class NotLoggedGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router,
		private messageService: MessageService,
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isLogged()){
			return true;
		}
		
		this.router.navigate(['dashboard']);
		this.messageService.error("Musisz być zalogowany!")
		return false;
	}
}

@Injectable({
	providedIn: 'root'
})
export class LoggedGuard implements CanActivate {

	constructor(
		private authService: AuthService,
		private router: Router,
		private messageService: MessageService,
	) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isLogged()){
			this.router.navigate(['dashboard']);
			this.messageService.error("Jesteś już zalogowany!")
			return false;
		}

		return true;
	}
}