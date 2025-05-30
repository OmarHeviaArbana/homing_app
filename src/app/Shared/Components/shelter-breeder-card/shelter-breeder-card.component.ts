import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelter-breeder-card',
  templateUrl: './shelter-breeder-card.component.html',
  styleUrls: ['./shelter-breeder-card.component.scss']
})
export class ShelterBreederCardComponent {
 @Input() item: any;
 @Input() onConfirm?: () => void;
 constructor(private router: Router) {}

 onDetailAnimal(): void {
  this.router.navigateByUrl('detelle-shelter');
  }
}
