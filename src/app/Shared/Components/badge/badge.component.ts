import { Component, Input } from '@angular/core';

export type BadgeVariant = 'Disponible' | 'enAdopcion'  | 'Urgente';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})


export class BadgeComponent {
    @Input() variant: BadgeVariant = 'Disponible';
    @Input() type: 'button' | 'submit' | 'reset' = 'button';
}
