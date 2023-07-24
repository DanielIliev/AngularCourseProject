import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterCredentials } from 'src/app/types/authTypes';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(25)
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    repass: ['', [
      Validators.required,
    ]]
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

  constructor(private fb: FormBuilder, private registerService: RegisterService) { }

  invalidFormMessage: string = '';

  register() {
    if (this.registerForm.invalid) {
      this.invalidFormMessage = 'The form you have submitted is invalid';
      return;
    }

    const credentials: RegisterCredentials = this.registerForm.value;

    this.registerService.register(credentials).subscribe({
      error: (err) => {
        if (err.error.errors) {
          this.invalidFormMessage = err.error.errors[0].msg;
          return;
        }

        this.invalidFormMessage = err.error;
      },
      complete: () => {
        this.invalidFormMessage = '';
        this.registerForm.reset();
      }
    });
  }
}
