import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './Components/button/button.component';
import { CardComponent } from './Components/card/card.component';
import { DialogComponent } from './Components/dialog/dialog.component';
import { MatDialogModule} from '@angular/material/dialog';



@NgModule({
  declarations: [ButtonComponent, CardComponent, DialogComponent],
  imports: [
  CommonModule,
  MatDialogModule
]
  ,
  exports: [
    ButtonComponent,
    CardComponent,
    DialogComponent
  ]
})
export class SharedModule { }
