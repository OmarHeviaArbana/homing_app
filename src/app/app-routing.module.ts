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
import { BreederListComponent } from './Modules/Breeders/component/breeder-list/breeder-list.component';
import { DetailAnimalComponent } from './Modules/Animals/components/detail-animal/detail-animal.component';
import { DetailBreederComponent } from './Modules/Breeders/component/detail-breeder/detail-breeder.component';
import { ApplicationAnimalComponent } from './Modules/Animals/components/application-animal/application-animal.component';
import { AnimalsControlComponent } from './Modules/Animals/components/animals-control/animals-control.component';
import { EditAnimalComponent } from './Modules/Animals/components/edit-animal/edit-animal.component';
import { AnimalApplicationsComponent } from './Modules/Animals/components/animal-applications/animal-applications.component';
import { AnimalUserApplicationsComponent } from './Modules/Users/components/animal-user-applications/animal-user-applications.component';


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
    path: 'detalle-mascota/:id',
    component: DetailAnimalComponent,
  },
  {
    path: 'refugios',
    component: ShelterListComponent,
  },
  {
    path: 'detalle-refugio/:id',
    component: DetailShelterComponent,
  },
  {
    path: 'criaderos',
    component: BreederListComponent,
  },
  {
    path: 'detalle-criadero/:id',
    component: DetailBreederComponent,
  },
  {
    path: 'solicitud-mascota',
    component: ApplicationAnimalComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mi-perfil',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gestion-mascotas',
    component: AnimalsControlComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'editar-mascota/:id',
    component: EditAnimalComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'solicitudes-adopcion',
    component: AnimalApplicationsComponent,
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: 'solicitudes-adopcion-usuario',
    component: AnimalUserApplicationsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
