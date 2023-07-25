import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './post.service';
import { Post } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post = {
    _id: '',
    title: '',
    content: '',
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

  constructor(private route: ActivatedRoute, private postService: PostService, private fb: FormBuilder) { }

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
