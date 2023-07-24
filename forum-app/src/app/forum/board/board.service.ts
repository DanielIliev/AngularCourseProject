import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from 'src/app/types/Post';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  fetchPosts() {
    const url: string = 'http://localhost:3000/posts';

    return this.http.get<Post[]>(url);
  }
}
