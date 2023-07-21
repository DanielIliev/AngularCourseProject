import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { baseUrl } from "src/app/constants/constants";
import { LoginCredentials } from "src/app/types/authTypes";

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials) {
    const body = JSON.stringify(credentials);

    return this.http.post(`${baseUrl}login`, body, { 'headers': { 'Content-Type': 'application/json' } });
  }
}
