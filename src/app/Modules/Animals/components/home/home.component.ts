import { Component, OnInit } from '@angular/core';
import * as AnimalActions from '../../actions';
import { AnimalDTO } from '../../models/animal.dto';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthDTO } from 'src/app/Modules/Auth/models/auth.dto';
import { UserDTO } from 'src/app/Modules/Users/models/user.dto';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  animals: AnimalDTO[];
  auth: any | null = null;
  user: any;
  role: any;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  currentSlide = 0;

  constructor(private router: Router, private store: Store<AppState>) {
    this.animals = new Array<AnimalDTO>();

    this.store.select('animals').subscribe((animals) => {
      this.animals = animals.animals;
    });
    this.store.select('auth').subscribe((auth) => {
      this.auth = auth;
      this.user = this.auth.user !== null ? this.auth.user : null
      this.role = this.user !== null ? this.user.role_id : null
     });
    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  ngOnInit(): void {
    this.loadAnimals();
  }

  private loadAnimals(): void {
    this.store.dispatch(AnimalActions.getAllAnimals());
  }

  goToLogin() {
    this.router.navigateByUrl('login');
  }
  goToRegister() {
    this.router.navigateByUrl('register');
  }
  goToAnimals() {
    this.router.navigateByUrl('mascotas');
  }
  goToPublicAnimals() {
    this.router.navigateByUrl('publicar-mascota');
  }

  prevSlide(): void {
    this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.animals.length - 1;
  }

  nextSlide(): void {
    this.currentSlide = this.currentSlide < this.animals.length - 1 ? this.currentSlide + 1 : 0;
  }

  goToAnimalDetail(animalId: number) {
    this.router.navigateByUrl('/detalle-mascota/' + animalId);
  }
}
