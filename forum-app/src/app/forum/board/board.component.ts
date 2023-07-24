import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Post } from 'src/app/types/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  posts: Post[] = [];
  errorMessage: string = '';

  constructor(private boardService: BoardService, private router: Router) { }

  ngOnInit(): void {
    this.boardService.fetchPosts().subscribe({
      next: (response) => {
        this.posts = response;
        console.log(response);
        
      },
      error: (err) => {
        this.errorMessage = err.error;
      }
    });
  }

  postDetails(id: String):void {
    console.log(`Post id: ${id}`);
    // this.router.navigate([`post/${id}`]);
  }
}