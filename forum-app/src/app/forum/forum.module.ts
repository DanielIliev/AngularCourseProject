import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { PostComponent } from './post/post.component';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [
    BoardComponent,
    PostComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BoardComponent,
    PostComponent,
    AddComponent,
    EditComponent
  ]
})
export class ForumModule { }
