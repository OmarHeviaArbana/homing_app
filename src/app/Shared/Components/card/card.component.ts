import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  imageList$!: Observable<string[]>;

  private _animal: any;

  @Input() set animal(value: any) {
    this._animal = value;
    this.imageList$ = of(this._animal?.images || []).pipe(
      map(images => {
        if (!images.length) return ['/assets/img/breeders.jpg'];
        return images
          .filter((img: { image_url: string }) => img.image_url?.trim() !== '')
          .sort((a: any, b: any) => (b.principal ? 1 : 0) - (a.principal ? 1 : 0))
          .map((img: { image_url: string }) => img.image_url);
      })
    );
  }

  get animal() {
    return this._animal;
  }
}
