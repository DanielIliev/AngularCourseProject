import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserData } from 'src/app/types/Auth';
import { EditForm } from 'src/app/types/Post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditService } from './edit.service';

export interface PostEdit {
  title: string;
  content: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  isAuthor: boolean = false;
  loggedIn: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';
  postId: string = '';

  userData: UserData = {
    _id: '',
    username: '',
    email: '',
  };

  post: PostEdit = {
    title: '',
    content: '',
  };

  editForm: FormGroup = this.fb.group({
    title: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    ],
    content: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(350),
      ],
    ],
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private editService: EditService
  ) {
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
          title: response.title,
          content: response.content,
        };

        this.editForm.patchValue({
          title: this.post.title,
          content: this.post.content,
        });

        this.isLoading = false;

        if (this.userData._id !== response.author) {
          this.router.navigate(['notfound']);
        }
      },
      error: (err) => {
        this.router.navigate(['notfound']);
      },
    });
  }

  edit(event: Event) {
    event.preventDefault();

    if (this.editForm.invalid) {
      this.errorMessage = 'The form you have submitted is invalid';
      return;
    }

    const data: EditForm = this.editForm.value;

    this.errorMessage = '';

    this.editService.editPost(this.postId, data).subscribe({
      error: (err) => {
        if (err.error.errors) {
          this.errorMessage = err.error.errors[0].msg;
        } else {
          this.errorMessage = err.message;
        }
      },
      complete: () => {
        this.router.navigate([`/post/${this.postId}`]);
      },
    });
  }

  cancel(): void {
    this.router.navigate([`/post/${this.postId}`]);
  }
}
