import { Component, OnInit } from '@angular/core';
import * as AnimalActions from '../../actions';
import { AnimalDTO } from '../../models/animal.dto';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as AnimalSelectors from '../../selectors/animal.selectors';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  animals$: Observable<AnimalDTO[]>;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor( private store: Store<AppState>) {
    this.animals$ = this.store.select(AnimalSelectors.selectAllAnimals);
    this.loading$ = this.store.select(AnimalSelectors.selectAnimalsLoading);
    this.loaded$ = this.store.select(AnimalSelectors.selectAnimalsFailure);
  }

  ngOnInit(): void {
    this.loadAnimals();
  }

  private loadAnimals(): void {
    this.store.dispatch(AnimalActions.getAllAnimals());
  }
}
