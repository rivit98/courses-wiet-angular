import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register-panel',
	templateUrl: './register-panel.component.html',
	styleUrls: ['./register-panel.component.css']
})
export class RegisterPanelComponent implements OnInit {

	registerForm: FormGroup;
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
		this.registerForm = this.formBuilder.group({
			username: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required]
		});

	}

	get f() { return this.registerForm.controls; }


	objectKeys(obj) {
		return Object.keys(obj);
	}

	onReset(): void {
		this.submitted = false;
		this.registerForm.reset();
	}

	onSubmit() {
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;
		let registerForm = this.registerForm.controls;

		this.authService.register(registerForm.username.value, registerForm.password.value)
			.then((user) => {
				this.router.navigate(['/dashboard']);
			})
			.catch((err) => {
				this.errorMessage = err.message;
				this.loading = false;
			})
	}
}
