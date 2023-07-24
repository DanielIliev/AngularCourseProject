import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddService } from './add.service';
import { postForm } from 'src/app/types/Post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  addForm: FormGroup = this.fb.group({
    title: ['', [
      Validators.required,
      Validators.maxLength(25)
    ]],
    content: ['', [
      Validators.required,
      Validators.maxLength(350)
    ]]
  });

  invalidFormErrorMessage: string = '';
  
  constructor(private fb: FormBuilder, private addService: AddService, private router: Router) {}

  add(event: Event): void {
    event.preventDefault();

    if (this.addForm.invalid) {
      this.invalidFormErrorMessage = 'The form you have submitted is invalid!';
      return;
    }

    const data: postForm = this.addForm.value;
    
    this.addService.addPost(data).subscribe({
      error: (err) => {
        this.invalidFormErrorMessage = err.error.errors[0].msg;
      },
      complete: () => {
        this.invalidFormErrorMessage = '';
        this.router.navigate(['board']);
      }
    });
    
  }
}
