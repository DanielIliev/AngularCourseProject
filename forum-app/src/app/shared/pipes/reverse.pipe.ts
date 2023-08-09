import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe<T> implements PipeTransform {

  transform(list: T[]): T[] {
    return list.reverse();
  }

}
