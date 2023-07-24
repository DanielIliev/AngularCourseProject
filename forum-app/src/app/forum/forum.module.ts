import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    BoardComponent,
    PostComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoardComponent,
    PostComponent
  ]
})
export class ForumModule { }
