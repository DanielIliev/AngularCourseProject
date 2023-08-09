import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from 'src/app/types/Post';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(list: Comment[]): Comment[] {
    return list.reverse();
  }

}
