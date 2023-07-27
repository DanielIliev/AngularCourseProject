import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Comment, Post } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  fetchPost(id: string) {
    const url = `${baseUrl}post/${id}`;

    return this.http.get<Post>(url);
  }

  deletePost(userId: string, postId: string) {
    const url = `${baseUrl}delete/${userId}/${postId}`;
    const token = String(this.localStorageService.get('authToken'));

    const headers = {
      'Authorization': `Bearer ${token}`
    }
    
    return this.http.get(url, { headers });
  }

  addComment(id: string, data: Comment) {
    const url = `${baseUrl}comment`;
    const token = String(this.localStorageService.get('authToken'));

    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    const body = {
      id,
      username: data.username,
      comment: data.comment
    }

    return this.http.post(url, body, { headers });
  }
}
