import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/types/Auth';
import { RegisterService } from './register.service';

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
    private registerService: RegisterService
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
        this.errorMessage = '';
        this.registerForm.reset();
      },
    });
  }
}
