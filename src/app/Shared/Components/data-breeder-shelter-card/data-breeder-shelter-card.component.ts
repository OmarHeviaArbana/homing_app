import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-data-breeder-shelter-card',
  templateUrl: './data-breeder-shelter-card.component.html',
  styleUrls: ['./data-breeder-shelter-card.component.scss']
})
export class DataBreederShelterCardComponent {
  @Input() item: any
  @Input() title = '';

}
