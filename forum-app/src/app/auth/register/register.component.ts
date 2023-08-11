import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/types/Auth';
import { RegisterService } from './register.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import jwt from 'jwt-decode';
import { WINDOW } from 'src/app/utils/window.injectable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    password: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    repass: ['', [Validators.required]],
  });

  // Getters for form fields
  get username() {
    return this.registerForm.get('username');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get repass() {
    return this.registerForm.get('repass');
  }

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private localStorageService: LocalStorageService,
    @Inject(WINDOW) private window: Window
  ) {}

  errorMessage: string = '';

  register() {
    this.errorMessage = '';
    if (this.registerForm.invalid) {
      this.errorMessage = 'The form you have submitted is invalid';
      return;
    }

    const credentials: RegisterCredentials = this.registerForm.value;

    this.registerService.register(credentials).subscribe({
      next: (response) => {
        const token = String(response);
        const userData = jwt(token);
        this.localStorageService.set('authToken', token);
        this.localStorageService.set('userData', JSON.stringify(userData));
        this.errorMessage = '';
      },
      error: (err) => {
        if (err.error.errors) {
          this.errorMessage = err.error.errors[0].msg;
        } else if (err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage =
            'We are unable to register your profile at the moment, please try again later.';
        }
      },
      complete: () => {
        this.window.location.reload();
      },
    });
  }
}
