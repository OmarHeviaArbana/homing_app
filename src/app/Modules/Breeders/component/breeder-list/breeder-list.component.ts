import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BreederDTO } from '../../models/breeder.dto';
import { UserDTO } from 'src/app/Modules/Users/models/user.dto';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as BreederActions from './../../actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-breeder-list',
  templateUrl: './breeder-list.component.html',
  styleUrls: ['./breeder-list.component.scss']
})
export class BreederListComponent {
  breeders$: Observable<BreederDTO[]>;
  user$: Observable<UserDTO | null> = null!;
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(private store: Store<AppState>, private router: Router) {
    this.breeders$ = this.store.select(state => state.breeder.breeders);
    this.user$ = this.store.select(state => state.user.user);
    this.loading$ = this.store.select(state => state.breeder.loading);
    this.loaded$ = this.store.select(state => state.breeder.loaded);

    }

  ngOnInit(): void {
    this.loadBreeders();
  }

  loadBreeders(): void {
    this.store.dispatch(BreederActions.getAllBreeders());
  }
  goToBreederDetail(breederId: any) {
    this.router.navigateByUrl('/detalle-criadero/' + breederId);
  }

}
