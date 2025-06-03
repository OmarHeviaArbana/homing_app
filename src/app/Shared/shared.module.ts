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
import { ImageUrlPipe } from './Pipes/image-url.pipe';
import { FormatDatePipe } from './Pipes/format-date.pipe';
import { HousingNamePipe } from './Pipes/housing-name.pipe';
import { SizeNamePipe } from './Pipes/size-name.pipe';
import { EnergieNamePipe } from './Pipes/energie-name.pipe';
import { AgeNamePipe } from './Pipes/age-name.pipe';




@NgModule({
  declarations: [ButtonComponent, CardComponent, DialogComponent, NoDataComponent, ShelterBreederCardComponent, BadgeComponent, DataBreederShelterCardComponent, ImageUrlPipe, FormatDatePipe, HousingNamePipe, SizeNamePipe, EnergieNamePipe, AgeNamePipe],
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
    MatIconModule,
    ImageUrlPipe,
    FormatDatePipe,
    HousingNamePipe,
    AgeNamePipe,
    EnergieNamePipe,
    SizeNamePipe
  ]
})
export class SharedModule { }
