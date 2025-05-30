import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/Auth/components/login.component';
import { HomeComponent } from './Modules/Animals/components/home/home.component';
import { RegisterComponent } from './Modules/Users/components/register/register.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { CreateAnimalComponent } from './Modules/Animals/components/create-animal/create-animal.component';
import { RoleGuard } from './Shared/Guards/role.guard';
import { AnimalsListComponent } from './Modules/Animals/components/animal-list/animals-list.component'
import { ShelterListComponent } from './Modules/Shelters/components/shelter-list/shelter-list.component';
import { DetailShelterComponent } from './Modules/Shelters/components/detail-shelter/detail-shelter.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
   {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'publicar-mascota',
    component: CreateAnimalComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'mascotas',
    component: AnimalsListComponent,
  },
  {
    path: 'refugios',
    component: ShelterListComponent,
  },
  {
    path: 'detelle-shelter',
    component: DetailShelterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
