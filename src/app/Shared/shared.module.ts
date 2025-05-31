import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './Components/button/button.component';
import { CardComponent } from './Components/card/card.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { NoDataComponent } from './Components/no-data/no-data.component';
import { ShelterBreederCardComponent } from './Components/shelter-breeder-card/shelter-breeder-card.component';
import { BadgeComponent } from './Components/badge/badge.component';
import { DataBreederShelterCardComponent } from './Components/data-breeder-shelter-card/data-breeder-shelter-card.component'
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [ButtonComponent, CardComponent, DialogComponent, NoDataComponent, ShelterBreederCardComponent, BadgeComponent, DataBreederShelterCardComponent],
  imports: [
  CommonModule,
  MatDialogModule,
]
  ,
  exports: [
    ButtonComponent,
    CardComponent,
    DialogComponent,
    NoDataComponent,
    ShelterBreederCardComponent,
    BadgeComponent,
    DataBreederShelterCardComponent,
    MatIconModule
  ]
})
export class SharedModule { }
