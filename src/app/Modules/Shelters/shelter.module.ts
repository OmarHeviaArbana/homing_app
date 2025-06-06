import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/Shared/shared.module';
import { ShelterListComponent } from './components/shelter-list/shelter-list.component';
import { DetailShelterComponent } from './components/detail-shelter/detail-shelter.component';




@NgModule({
  declarations: [
    ShelterListComponent,
    DetailShelterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    SharedModule,
  ],
})
export class ShelterModule {}
