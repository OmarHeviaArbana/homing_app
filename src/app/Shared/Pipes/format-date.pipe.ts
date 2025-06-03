import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  transform(value: string | Date, format: 'short' | 'long' = 'short'): string {
    if (!value) return '';

    const date = new Date(value);

    const optionsShort: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };

    const optionsLong: Intl.DateTimeFormatOptions = {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    };

    return date.toLocaleDateString('es-ES', format === 'short' ? optionsShort : optionsLong);
  }
}
