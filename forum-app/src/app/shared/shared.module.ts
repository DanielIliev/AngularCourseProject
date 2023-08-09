import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ShortenPipe } from './pipes/shorten.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    ShortenPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ShortenPipe
  ]
})
export class SharedModule { }
