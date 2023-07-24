import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostService } from './post.service';
import { Post } from 'src/app/types/Post';

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

  constructor(private route: ActivatedRoute, private postService: PostService) { }

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
}
