  import { Component } from '@angular/core';
  import { Observable } from 'rxjs';
  import { AuthDTO } from 'src/app/Modules/Auth/models/auth.dto';
  import { AnimalDTO } from '../../models/animal.dto';
  import { AppState } from 'src/app/app.reducers';
  import { Store } from '@ngrx/store';
  import * as AnimalActions from './../../actions';
  import { UserDTO } from 'src/app/Modules/Users/models/user.dto';

  @Component({
    selector: 'app-animals-list',
    templateUrl: './animals-list.component.html',
    styleUrls: ['./animals-list.component.scss']
  })
  export class AnimalsListComponent {


  animals$: Observable<AnimalDTO[]>;
  user$: Observable<UserDTO | null> = null!;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.animals$ = this.store.select(state => state.animals.animals);
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.animals.loading);
    this.loaded$ = this.store.select(state => state.animals.loaded);
  }

  ngOnInit(): void {
    this.loadAnimals();
  }

  loadAnimals(): void {
    this.store.dispatch(AnimalActions.getAllAnimals());

  }
  }
