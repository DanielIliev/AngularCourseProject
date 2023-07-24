import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { PostComponent } from './post/post.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    BoardComponent,
    PostComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BoardComponent,
    PostComponent,
    AddComponent
  ]
})
export class ForumModule { }
