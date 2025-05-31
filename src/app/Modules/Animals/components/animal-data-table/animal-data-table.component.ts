import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-animal-data-table',
  templateUrl: './animal-data-table.component.html',
  styleUrls: ['./animal-data-table.component.scss']
})
export class AnimalDataTableComponent {
  @Input() item: any
  @Input() title = '';

   isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }
}
