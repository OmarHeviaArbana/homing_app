import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from 'src/app/Shared/Components/button/button.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardComponent } from 'src/app/Shared/Components/card/card.component';


@NgModule({
  declarations: [
    HomeComponent,
    ButtonComponent,
    CardComponent

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
  ],
})
export class AnimalModule {}
