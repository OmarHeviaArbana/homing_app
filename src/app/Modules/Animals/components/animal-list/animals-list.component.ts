  import { Component, OnInit } from '@angular/core';
  import { combineLatest, Observable, of, Subject } from 'rxjs';
  import { AnimalDTO } from '../../models/animal.dto';
  import { AppState } from 'src/app/app.reducers';
  import { Store } from '@ngrx/store';
  import * as AnimalActions from './../../actions';
  import { UserDTO } from 'src/app/Modules/Users/models/user.dto';
  import { AuxiliarEntityDTO } from 'src/app/Shared/Models/auxiliar-entity.dto';
  import { map, startWith } from 'rxjs/operators';
  import { Router } from '@angular/router';

  @Component({
    selector: 'app-animals-list',
    templateUrl: './animals-list.component.html',
    styleUrls: ['./animals-list.component.scss']
  })
  export class AnimalsListComponent implements OnInit{

  animals$: Observable<AnimalDTO[]>;
  user$: Observable<UserDTO | null> = null!;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  speciesList$!: Observable<AuxiliarEntityDTO[]>;
  statusList$!: Observable<AuxiliarEntityDTO[]>;
  ageCategoriesList$!: Observable<AuxiliarEntityDTO[]>;
  genresList$!: Observable<AuxiliarEntityDTO[]>;

  selectedSpecies: number | null = null;
  selectedAge: number | null = null;
  selectedGenre: number | null = null;
  selectedStatus: number | null = null;
  filteredAnimals$!: Observable<AnimalDTO[]>;

  private filtersChanged$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  constructor(private store: Store<AppState>, private router: Router) {
    this.animals$ = this.store.select(state => state.animals.animals);
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.animals.loading);
    this.loaded$ = this.store.select(state => state.animals.loaded);
    this.speciesList$ = this.store.select(state => state.animals.species);
    this.statusList$ = this.store.select(state => state.animals.status);
    this.ageCategoriesList$ = this.store.select(state => state.animals.ageCategories);
    this.genresList$ = this.store.select(state => state.animals.genres);
  }


  ngOnInit(): void {
    this.loadAnimals();
    this.loadDataFilters();
    this.filteredAnimals$ = combineLatest([
    this.animals$,
    this.filtersChanged$.pipe(startWith([]))
    ]).pipe(
      map(([animals]) => this.applyFilters(animals))
    );
  }

  loadAnimals(): void {
    this.store.dispatch(AnimalActions.getAllAnimals());
  }

  loadDataFilters() : void {
    this.store.dispatch(AnimalActions.getSpeciesAux());
    this.store.dispatch(AnimalActions.getStatusAux());
    this.store.dispatch(AnimalActions.getAgeCategoriesAux());
    this.store.dispatch(AnimalActions.getGenresAux());
  }

  onFilterChange(): void {
    this.filtersChanged$.next();
  }

  applyFilters(animals: AnimalDTO[]): AnimalDTO[] {

    return animals.filter(animal =>
      (!this.selectedSpecies || animal.species_id === this.selectedSpecies) &&
      (!this.selectedAge || animal.agecategory_id === this.selectedAge) &&
      (!this.selectedGenre || animal.genre_id === this.selectedGenre) &&
      (!this.selectedStatus || animal.status_id === this.selectedStatus)
    );
  }

  goToAnimalDetail(animalId: number) {
    this.router.navigateByUrl('/detalle-mascota/' + animalId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
