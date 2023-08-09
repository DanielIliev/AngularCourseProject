import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { RegisterCredentials } from 'src/app/types/authTypes';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(credentials: RegisterCredentials) {
    const headers = { 'Content-Type': 'application/json' };

    return this.http.post(
      `${baseUrl}register`,
      { ...credentials },
      { headers }
    );
  }
}
