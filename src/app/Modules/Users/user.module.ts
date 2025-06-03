import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from 'src/app/Modules/Users/components/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from 'src/app/Shared/shared.module';
import { RegisterUserFormComponent } from './components/register-user-form/register-user-form.component';
import { RegisterShelterFormComponent } from './components/register-shelter-form/register-shelter-form.component';
import { RegisterBreederFormComponent } from './components/register-breeder-form/register-breeder-form.component';
import { AnimalUserApplicationsComponent } from './components/animal-user-applications/animal-user-applications.component';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterUserFormComponent,
    RegisterShelterFormComponent,
    RegisterBreederFormComponent,
    AnimalUserApplicationsComponent,



  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    SharedModule,


  ],
})
export class UserModule {}
