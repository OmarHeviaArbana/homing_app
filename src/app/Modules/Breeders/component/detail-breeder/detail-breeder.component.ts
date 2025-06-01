import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.reducers';
import * as BreederActions from './../../actions';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-detail-breeder',
  templateUrl: './detail-breeder.component.html',
  styleUrls: ['./detail-breeder.component.scss']
})
export class DetailBreederComponent {
  breederDetail$: Observable<any| null>;
  animalsBreeder$: Observable<any| null>;
  breederId: any;
  breederData!: Observable<{ label: string; value: string | number | boolean }[]>;

   constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.breederId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.breederDetail$ = this.store.select(state => state.breeder.breederDetail);
    this.animalsBreeder$ = this.store.select(state => state.breeder.animalsBreeder);

    this.breederData = this.breederDetail$.pipe(
      map(breeder => breeder ? [
        { label: 'Nº Nucleo zoológico', value: breeder?.certification || 'N/D' },
        { label: 'Dirección', value: `${breeder?.address} (${breeder.location})` || 'N/D' },
        { label: 'Teléfono', value: breeder?.phone|| 'N/D' },
        { label: 'Email', value: breeder.email_breeder || 'N/D' },
      ] : [])
    );
    this.loadDetailBreeder()
    this.loadAnimalsBreeder()
  }

  loadDetailBreeder(): void {
    if (this.breederId) {
      this.store.dispatch(BreederActions.getBreederById({ breederId: this.breederId }));
    }
  }

  loadAnimalsBreeder(): void {
    if (this.breederId) {
      this.store.dispatch(BreederActions.getAnimalsBreeder({ breederId: this.breederId }));
    }
  }

  goToAnimalDetail(animalId: number) {
    this.router.navigateByUrl('/detalle-mascota/' + animalId);
  }

  goToBack() :void {
    this.location.back();
  }
}
