import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from 'src/app/constants/constants';
import { Post } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  fetchPost(id: string) {
    const url = `${baseUrl}post/${id}`;

    return this.http.get<Post>(url);
  }

  deletePost(id: string) {
    const url = `${baseUrl}delete/${id}`;

    return this.http.get(url);
  }
}
