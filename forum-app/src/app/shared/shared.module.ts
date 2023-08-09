import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { ReversePipe } from './pipes/reverse.pipe';



@NgModule({
  declarations: [
    LoaderComponent,
    ShortenPipe,
    ReversePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    ShortenPipe,
    ReversePipe
  ]
})
export class SharedModule { }
