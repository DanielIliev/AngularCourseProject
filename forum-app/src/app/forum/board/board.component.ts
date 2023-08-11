import { Component, OnInit } from '@angular/core';
import { BoardService } from './board.service';
import { Post } from 'src/app/types/Post';
import { Router } from '@angular/router';
import { Observer, Subscription } from 'rxjs';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  isLoading: boolean = true;
  posts: Post[] = [];
  errorMessage: string = '';
  boardSub: Subscription | undefined;
  boardObs: Observer<Post[]> = {
    next: (response) => {
      this.posts = response;
      this.isLoading = false;
    },
    error: (err) => {
      this.errorMessage = err.message;
    },
    complete: () => {
      console.log('Done');
    }
  }

  constructor(private boardService: BoardService, private router: Router) {}

  ngOnInit(): void {
    this.boardSub = this.boardService.fetchPosts().subscribe(this.boardObs);
  }

  postDetails(id: String): void {
    this.router.navigate([`post/${id}`]);
  }

  ngOnDestroy() {
    this.boardSub?.unsubscribe();
  }
}
