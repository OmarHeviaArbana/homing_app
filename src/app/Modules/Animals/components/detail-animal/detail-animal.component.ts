import { Component } from '@angular/core';
import { AnimalDTO } from '../../models/animal.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as AnimalActions from './../../actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-animal',
  templateUrl: './detail-animal.component.html',
  styleUrls: ['./detail-animal.component.scss']
})
export class DetailAnimalComponent {

  animalDetail$: Observable<any| null>;
  animalId: string;
  imageList$!: Observable<any | null>;
  currentIndex = 0;
  mainData!: Observable<{ label: string; value: string | number | boolean }[]>;
  healthData!: Observable<{ label: string; value: string | number | boolean}[]>;
  auth: any | null = null;
  user: any;
  role: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.animalId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.animalDetail$ = this.store.select(state => state.animals.animalDetail);

  this.mainData = this.animalDetail$.pipe(
    map(animal => animal ? [
      { label: 'Sexo', value: animal.genre?.name || 'N/D' },
      { label: 'Edad', value: animal.age_category?.name || 'N/D' },
      { label: 'Peso', value: animal.weight ? `${animal.weight} Kg` : 'N/D' },
      { label: 'Cruz', value: animal.height ? `${animal.height} cm` : 'N/D' },
      { label: 'Tamaño', value: animal.size?.name || 'N/D' },
      { label: 'Energía', value: animal.energy_level?.name || 'N/D' }
    ] : [])
  );

  this.healthData = this.animalDetail$.pipe(
    map(animal => animal ? [
      { label: 'Identificador', value: animal.identifier},
      { label: 'Vacunas', value: animal.vaccines },
      { label: 'Esterilizada', value: animal.sterilization },
      { label: 'Cuidados especiales', value: animal.care  }
      ] : [])
  );

  this.store.select('auth').subscribe((auth) => {
    this.auth = auth;
    this.user = this.auth.user !== null ? this.auth.user : null
    this.role = this.user !== null ? this.user.role_id : null

  });
  this.loadDetailAnimal()

  this.imageList$ = this.animalDetail$.pipe(
    map(animal => {
      if (!animal.images) return '/assets/img/breeders.jpg';

      return animal.images
      .filter((img: { image_url: string }) => img.image_url && img.image_url.trim() !== '')
      .sort((a: { principal: boolean; }, b: { principal: boolean; }) => (b.principal ? 1 : 0) - (a.principal ? 1 : 0)) // Principal primero
      .map((img: { image_url: string }) => img.image_url);
    })
  );

  }

  loadDetailAnimal(): void {
    if (this.animalId) {
      this.store.dispatch(AnimalActions.getAnimalById({ animalId: this.animalId }));
    }
  }

  nextImage(length: number): void {
    this.currentIndex = (this.currentIndex + 1) % length;
  }

  prevImage(length: number): void {
    this.currentIndex = (this.currentIndex - 1 + length) % length;
  }

  goToBack() :void {
    this.location.back();
  }

  goToApplicationAnimal(animal: any) :void {
    if (this.user == null) {
      this.router.navigateByUrl('login');
    } else {
      this.router.navigateByUrl('solicitud-mascota' , {state: { animal: animal} });

    }
  }

  goToUpddateAnimal(animalId: string){
  this.router.navigateByUrl('/editar-mascota/' + animalId);
  }
}

