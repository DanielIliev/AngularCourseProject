import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserData } from 'src/app/types/authTypes';
import { EditForm } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface PostEdit {
  title: string,
  content: string,
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  isAuthor: boolean = false;
  loggedIn: boolean = false;
  errorMessage: string = '';
  postId: string = '';

  userData: UserData = {
    _id: '',
    username: '',
    email: ''
  }

  post: PostEdit = {
    title: '',
    content: '',
  }

  editForm: FormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(25)
    ]],
    content: ['', [
      Validators.required,
      Validators.maxLength(350)
    ]]
  });

  constructor(private route: ActivatedRoute, private router: Router, private postService: PostService, private localStorageService: LocalStorageService, private fb: FormBuilder) {
    const token = this.localStorageService.get('authToken');
    const userData = this.localStorageService.get('userData');

    if (token) {
      this.loggedIn = true;
    }

    if (userData) {
      this.userData = JSON.parse(userData);
    }

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.postId = String(params.get('id'));
    });
    
  }

  ngOnInit(): void {
      this.postService.fetchPost(this.postId).subscribe({
        next: (response) => {
          this.post = {
            title: String(response.title),
            content: String(response.content)
          };

          this.editForm.patchValue({
            title: this.post.title,
            content: this.post.content
          });

          if (this.userData._id !== response.author) {
            this.router.navigate(['notfound']);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.router.navigate(['notfound']);
          }
        }
      });
  }

  edit(event: Event) {
      event.preventDefault();

      const data: EditForm = this.editForm.value;

  }

  cancel(): void {
    this.router.navigate(['..']);
  }
}