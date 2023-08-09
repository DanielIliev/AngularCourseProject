import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(str: string, limiter: number): string {
    if (str.length > limiter) {
      return `${str.slice(0, limiter)}...`;
    }

    return str;
  }
}
