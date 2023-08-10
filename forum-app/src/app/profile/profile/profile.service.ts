import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from 'src/app/constants/constants';
import { ProfilePosts } from 'src/app/types/Profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfilePosts(id: string): Observable<ProfilePosts[]> {
    const url: string = `${baseUrl}profile/${id}`;
    
    return this.http.get<ProfilePosts[]>(url);
  }
}
