import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Role } from '../interfaces/user';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	loggedAs: string;
	admin: boolean;

	constructor(
		private authService: AuthService
	) {
		this.loggedAs = "";
		this.admin = false;
	}

	ngOnInit() {
		this.authService.user.subscribe((user) => {
			if (user) {
				this.loggedAs = user.email.split('@')[0];
				if(user.role === Role.Admin){
					this.admin = true;
				}else{
					this.admin = false;
				}
			} else { //logged out
				this.loggedAs = "";
				this.admin = false;
			}
		})
	}

	onClickLogout() {
		this.authService.logout();
	}

}
