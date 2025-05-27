import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
import * as AnimalActions from './../../actions';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-create-animal-form',
  templateUrl: './create-animal-form.component.html',
  styleUrls: ['./create-animal-form.component.scss']
})

export class CreateAnimalFormComponent {
   @Output() formReady = new EventEmitter<FormGroup>();

    formPublicAnimal!: FormGroup;

    speciesList$!: Observable<AuxiliarEntityDTO[]>;
    statusList$!: Observable<AuxiliarEntityDTO[]>;
    ageCategoriesList$!: Observable<AuxiliarEntityDTO[]>;
    genresList$!: Observable<AuxiliarEntityDTO[]>;
    sizesList$!: Observable<AuxiliarEntityDTO[]>;
    energyLevelsList$!: Observable<AuxiliarEntityDTO[]>;
    housingStagesList$!: Observable<AuxiliarEntityDTO[]>;


    constructor(private formBuilder: FormBuilder,  private store: Store<AppState>,) {}

    ngOnInit(): void {
      this.formPublicAnimal = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        location: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        species_id: ['', Validators.required],
        status_id: ['', Validators.required],
        agecategory_id: ['', Validators.required],
        genre_id: ['', Validators.required],
        size_id: ['', Validators.required],
        energylevel_id: ['', Validators.required],
        identifier: [false, Validators.requiredTrue],
        vaccines: [false, Validators.requiredTrue],
        sterelization: [false, Validators.requiredTrue],
        care: [false, Validators.requiredTrue],
      });

      this.formReady.emit(this.formPublicAnimal);

      this.store.dispatch(AnimalActions.getSpeciesAux());
      this.store.dispatch(AnimalActions.getStatusAux());
      this.store.dispatch(AnimalActions.getAgeCategoriesAux());
      this.store.dispatch(AnimalActions.getGenresAux());
      this.store.dispatch(AnimalActions.getSizesAux());
      this.store.dispatch(AnimalActions.getEnergyLevelsAux());
      this.store.dispatch(AnimalActions.getHousingStagesAux());

      this.loadSelects();
    }

    loadSelects(): void {
      this.speciesList$ = this.store.select(state => state.animals.species);
      this.statusList$ = this.store.select(state => state.animals.status);
      this.ageCategoriesList$ = this.store.select(state => state.animals.ageCategories);
      this.genresList$ = this.store.select(state => state.animals.genres);
      this.sizesList$ = this.store.select(state => state.animals.sizes);
      this.energyLevelsList$ = this.store.select(state => state.animals.energyLevels);
      this.housingStagesList$ = this.store.select(state => state.animals.housingStages);
    }

    get name() {
      return this.formPublicAnimal.get('name');
    }

    get description() {
      return this.formPublicAnimal.get('description');
    }
    get location() {
      return this.formPublicAnimal.get('location');
    }
    get weight() {
      return this.formPublicAnimal.get('weight');
    }
    get height() {
      return this.formPublicAnimal.get('height');
    }
    get species_id() {
      return this.formPublicAnimal.get('species_id');
    }
    get status_id() {
      return this.formPublicAnimal.get('status_id');
    }
    get agecategory_id() {
      return this.formPublicAnimal.get('agecategory_id');
    }
    get genre_id() {
      return this.formPublicAnimal.get('genre_id');
    }
    get size_id() {
      return this.formPublicAnimal.get('size_id');
    }
    get energylevel_id() {
      return this.formPublicAnimal.get('energylevel_id');
    }
    get identifier() {
      return this.formPublicAnimal.get('identifier');
    }
    get vaccines() {
      return this.formPublicAnimal.get('vaccines');
    }
    get sterelization() {
      return this.formPublicAnimal.get('sterelization');
    }
    get care() {
      return this.formPublicAnimal.get('care');
    }


    getErrorMessage(controlName: string): string {
      const control = this.formPublicAnimal.get(controlName);
      if (control?.hasError('required')) return 'Campo obligatorio';
      return '';
    }

}
