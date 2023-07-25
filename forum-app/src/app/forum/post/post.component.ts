import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from './post.service';
import { Post } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserData } from 'src/app/types/authTypes';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  loggedIn: boolean = false;
  isAuthor: boolean = false;
  userData: UserData = {
    _id: '',
    username: '',
    email: ''
  }
  errorMessage = '';

  post: Post = {
    _id: '',
    title: '',
    content: '',
    author: '',
    authorName: '',
    comments: []
  };

  commentForm: FormGroup = this.fb.group({
    username: this.userData.username,
    comment: ['', [
      Validators.required,
      Validators.maxLength(350)
    ]],
  });

  get comment() {
    return this.commentForm.get('comment');
  }

  constructor(private route: ActivatedRoute, private postService: PostService, private fb: FormBuilder, private localStorageService: LocalStorageService, private router: Router) {
    const token = this.localStorageService.get('authToken');
    const userData = this.localStorageService.get('userData');

    if (token) {
      this.loggedIn = true;
    }

    if (userData) {
      this.userData = JSON.parse(userData);
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const postId = String(params.get('id'));

      this.postService.fetchPost(postId).subscribe({
        next: (response) => {
          this.post = response;
          console.log(this.userData._id === response.author);
          
          if (this.userData._id === response.author) {
            this.isAuthor = true;
          }
        }
      });
    });
  }

  addComment() {
    console.log(this.commentForm.value);
  }

  deletePost(postId: String): void {
    this.postService.deletePost(String(postId)).subscribe({
      error: (err) => {
        this.errorMessage = err;
      },
      complete: () => {
        this.router.navigate(['/board']);
      }
    });
  }
}
