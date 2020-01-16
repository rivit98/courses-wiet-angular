import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	loggedAs: string;

	constructor(
		private authService: AuthService
	) {
		this.loggedAs = "";
	}

	ngOnInit() {
		this.authService.authState$.subscribe((user) => {
			if (user) {
				this.loggedAs = user.email;
			} else { //logged out
				this.loggedAs = "";
			}
		})
	}

	onClickLogout() {
		this.authService.logout();
	}

}
