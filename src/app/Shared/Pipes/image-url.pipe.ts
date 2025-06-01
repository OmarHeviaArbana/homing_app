import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {
  private readonly API_URL = 'http://127.0.0.1:8000'
 transform(relativePath: string | null | undefined): string {

  if (!relativePath) {
    return '/assets/img/dog-287420_1920.jpg';
  }

  if (relativePath.startsWith('storage/animal_images/')) {
    return `${this.API_URL}/${relativePath}`;
  } else {
    return '/assets/img/dog-287420_1920.jpg';
  }


 }
}
