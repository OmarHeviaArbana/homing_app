import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Modules/Auth/components/login.component';
import { HomeComponent } from './Modules/Animals/components/home/home.component';
import { RegisterComponent } from './Modules/Users/components/register/register.component';
import { AuthGuard } from './Shared/Guards/auth.guard';
import { CreateAnimalComponent } from './Modules/Animals/components/create-animal/create-animal.component';


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
    path: 'publicar-animal',
    component: CreateAnimalComponent,
    canActivate: [AuthGuard],

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
