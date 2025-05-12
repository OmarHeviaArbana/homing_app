import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { ButtonComponent } from 'src/app/Shared/Components/button/button.component';



@NgModule({
  declarations: [
    HomeComponent,
    ButtonComponent

  ],
  imports: [
    CommonModule,



  ],
})
export class AnimalModule {}
