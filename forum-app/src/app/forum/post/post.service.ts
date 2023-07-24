import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  fetchPost(id: string) {
    const url = `http://localhost:3000/post/${id}`;

    return this.http.get<Post>(url);
  }
}
