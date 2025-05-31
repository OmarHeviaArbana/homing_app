import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import { UserDTO } from 'src/app/Modules/Users/models/user.dto';
import * as ShelterActions from './../../actions';
import { ShelterDTO } from '../../models/shelter.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelter-list',
  templateUrl: './shelter-list.component.html',
  styleUrls: ['./shelter-list.component.scss']
})
export class ShelterListComponent {

  shelters$: Observable<ShelterDTO[]>;
  user$: Observable<UserDTO | null> = null!;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.shelters$ = this.store.select(state => state.shelter.shelters);
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.shelter.loading);
    this.loaded$ = this.store.select(state => state.shelter.loaded);

  }

  ngOnInit(): void {
    this.loadShelters();
  }

  loadShelters(): void {
    this.store.dispatch(ShelterActions.getAllShelters());
  }

  goToShelterDetail(shelterId: any) {
    this.router.navigateByUrl('/detalle-refugio/' + shelterId);
  }
}
