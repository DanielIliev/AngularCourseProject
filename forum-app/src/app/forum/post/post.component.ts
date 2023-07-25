import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './post.service';
import { Post } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loggedIn: boolean = false;

  post: Post = {
    _id: '',
    title: '',
    content: '',
    author: '',
    authorName: '',
    comments: []
  };

  commentForm: FormGroup = this.fb.group({
    username: 'Pesho',
    comment: ['', [
      Validators.required,
      Validators.maxLength(350)
    ]],
  });

  get comment() {
    return this.commentForm.get('comment');
  }

  constructor(private route: ActivatedRoute, private postService: PostService, private fb: FormBuilder, private localStorageService: LocalStorageService) {
    const token = this.localStorageService.get('authToken');

    if (token) {
      this.loggedIn = true;
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const postId = String(params.get('id'));

      this.postService.fetchPost(postId).subscribe({
        next: (response) => {
          this.post = response;
        }
      });
    });
  }

  addComment() {
    console.log(this.commentForm.value);
  }
}
