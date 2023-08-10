import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/constants/constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ProfilePosts } from 'src/app/types/Profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  getProfilePosts(id: string): Observable<ProfilePosts[]> {
    const url: string = `${baseUrl}profile/${id}`;
    const token = this.localStorageService.get('authToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.get<ProfilePosts[]>(url, { headers });
  }
}
