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

export class CreateAnimalFormComponent implements OnInit{
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() filesChanged = new EventEmitter<{ [key: string]: File | null }>();
  formPublicAnimal!: FormGroup;

  speciesList$!: Observable<AuxiliarEntityDTO[]>;
  statusList$!: Observable<AuxiliarEntityDTO[]>;
  ageCategoriesList$!: Observable<AuxiliarEntityDTO[]>;
  genresList$!: Observable<AuxiliarEntityDTO[]>;
  sizesList$!: Observable<AuxiliarEntityDTO[]>;
  energyLevelsList$!: Observable<AuxiliarEntityDTO[]>;

  selectedFiles: { [key: string]: File | null } = {};
  imagePreviews: { [key: string]: string | null } = {};

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
      identifier: [false, Validators.required],
      vaccines: [false, Validators.required],
      sterilization: [false, Validators.required],
      care: ['', Validators.required],
      principal_image: ['', Validators.required],
      optional_image_one: [''],
      optional_image_two: [''],
    });

    this.formReady.emit(this.formPublicAnimal);

    this.store.dispatch(AnimalActions.getSpeciesAux());
    this.store.dispatch(AnimalActions.getStatusAux());
    this.store.dispatch(AnimalActions.getAgeCategoriesAux());
    this.store.dispatch(AnimalActions.getGenresAux());
    this.store.dispatch(AnimalActions.getSizesAux());
    this.store.dispatch(AnimalActions.getEnergyLevelsAux());

    this.loadSelects();
  }

  loadSelects(): void {
    this.speciesList$ = this.store.select(state => state.animals.species);
    this.statusList$ = this.store.select(state => state.animals.status);
    this.ageCategoriesList$ = this.store.select(state => state.animals.ageCategories);
    this.genresList$ = this.store.select(state => state.animals.genres);
    this.sizesList$ = this.store.select(state => state.animals.sizes);
    this.energyLevelsList$ = this.store.select(state => state.animals.energyLevels);

  }


  onImageSelected(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFiles[field] = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreviews[field] = reader.result as string;
      };
      reader.readAsDataURL(file);

      this.filesChanged.emit(this.selectedFiles);
    }
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
      return this.formPublicAnimal.get('sterilization');
    }
    get care() {
      return this.formPublicAnimal.get('care');
    }
    get principal_image() {
      return this.formPublicAnimal.get('principal_image');
    }
    get optional_image_one() {
      return this.formPublicAnimal.get('optional_image_one');
    }
    get optional_image_two() {
      return this.formPublicAnimal.get('optional_image_two');
    }


    getErrorMessage(controlName: string): string {
      const control = this.formPublicAnimal.get(controlName);
      if (control?.hasError('required')) return 'Campo obligatorio';
      return '';
    }



}
