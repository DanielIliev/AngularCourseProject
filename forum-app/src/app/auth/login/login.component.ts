import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { WINDOW } from 'src/app/utils/window.injectable';
import { LoginCredentials } from 'src/app/types/authTypes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    username: ['', [
      Validators.required,
      Validators.minLength(4),
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(4),
    ]],
  });

  invalidFormMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginService, private localStorageService: LocalStorageService, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    // this.loginForm.valueChanges.subscribe(console.log);
  }

  login() {
    if (this.loginForm.invalid) {
      this.invalidFormMessage = 'The form you have submitted is invalid!';
      return;
    }

    const credentials: LoginCredentials = this.loginForm.value;

    this.loginService.login(credentials).subscribe({
      next: (response) => {
        const token = String(response);
        this.localStorageService.set('authToken', token);
        this.invalidFormMessage = '';
      },
      error: (err) => {
        this.invalidFormMessage = err.error.message;
      },
      complete: () => {
        this.window.location.reload();
      }
    });
  }
}