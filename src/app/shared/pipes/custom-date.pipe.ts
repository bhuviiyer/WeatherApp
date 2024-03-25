import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({name: 'customDate'})
export class CustomDatePipe implements PipeTransform {
  transform(value: number): string {
    const jsDate = new Date(value * 1000);
    return formatDate(jsDate, 'EEEE, MMM d', 'en-US');
  }
}
