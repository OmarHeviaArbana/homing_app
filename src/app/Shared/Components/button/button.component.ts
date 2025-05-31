import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'accent'| 'terciary' | 'outline' | 'text' | 'card' | 'dialog-close' | 'dialog-action' | 'Disponible' | 'enAdopcion'  | 'Urgente' | 'card-shelter-breeder';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})

export class ButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() disabled = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() fullWidth = false;
  @Input() ariaLabel?: string;
}
