import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login-panel',
	templateUrl: './login-panel.component.html',
	styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

	loginForm: FormGroup;
	submitted = false;
	loading = false;
	errorMessage = "";

	validationErrorsMsg = {
		username: {
			required: "To pole jest wymagane",
			email: "To nie jest prawidłowy email"
		},
		password: {
			required: "To pole jest wymagane"
		}
	}
	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.errorMessage = "";
		this.loading = false;
		this.submitted = false;
	}

	ngOnInit() {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});
	}

	get f() { return this.loginForm.controls; }


	objectKeys(obj) {
		return Object.keys(obj);
	}

	onSubmit() {
		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}
		
		this.loading = true;
		let loginForm = this.loginForm.controls;

		this.authService.login(loginForm.username.value, loginForm.password.value)
			.then((user) => {
				this.router.navigate(['/dashboard']);
			})
			.catch((err) => {
				this.errorMessage = err.message;
				this.loading = false;
			})
	}

}
