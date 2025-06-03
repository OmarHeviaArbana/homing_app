import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from 'src/app/Shared/shared.module';
import { CreateAnimalComponent } from './components/create-animal/create-animal.component';
import { CreateAnimalFormComponent } from './components/create-animal-form/create-animal-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AnimalsListComponent } from './components/animal-list//animals-list.component';
import { DetailAnimalComponent } from './components/detail-animal/detail-animal.component';
import { AnimalDataTableComponent } from './components/animal-data-table/animal-data-table.component';
import { ApplicationAnimalComponent } from './components/application-animal/application-animal.component';
import { AnimalsControlComponent } from './components/animals-control/animals-control.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditAnimalComponent } from './components/edit-animal/edit-animal.component';
import { AnimalApplicationsComponent } from './components/animal-applications/animal-applications.component';


@NgModule({
  declarations: [
    HomeComponent,
    CreateAnimalComponent,
    CreateAnimalFormComponent,
    AnimalsListComponent,
    DetailAnimalComponent,
    AnimalDataTableComponent,
    ApplicationAnimalComponent,
    AnimalsControlComponent,
    EditAnimalComponent,
    AnimalApplicationsComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
    MatPaginatorModule,


  ],
})
export class AnimalModule {}
