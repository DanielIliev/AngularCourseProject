import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PostForm } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root',
})
export class AddService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  addPost(data: PostForm) {
    const url = 'http://localhost:3000/posts/add';
    const token = this.localStorageService.get('authToken');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };

    return this.http.post(url, data, { headers });
  }
}
