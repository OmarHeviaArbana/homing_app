import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/app.reducers';
import * as ShelterActions from './../../actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail-shelter',
  templateUrl: './detail-shelter.component.html',
  styleUrls: ['./detail-shelter.component.scss']
})
export class DetailShelterComponent {

  shelterDetail$: Observable<any| null>;
  animalsShelter$: Observable<any| null>;
  shelterId: string;
  shelterData!: Observable<{ label: string; value: string | number | boolean }[]>;

   constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private router: Router
  ) {
    this.shelterId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
    this.shelterDetail$ = this.store.select(state => state.shelter.shelterDetail);
    this.animalsShelter$ = this.store.select(state => state.shelter.animalsShelter);

    this.shelterData = this.shelterDetail$.pipe(
      map(shelter => shelter ? [
        { label: 'Certificado de empresa', value: shelter?.cif || 'N/D' },
        { label: 'Dirección', value: `${shelter?.address} (${shelter.location})` || 'N/D' },
        { label: 'Teléfono', value: shelter?.phone|| 'N/D' },
        { label: 'Email', value: shelter.email_shelter || 'N/D' },
      ] : [])
    );
    this.loadDetailShelter()
    this.loadAnimalsShelter()
  }

  loadDetailShelter(): void {
    if (this.shelterId) {
      this.store.dispatch(ShelterActions.getShelterById({ shelterId: this.shelterId }));
    }
  }

  loadAnimalsShelter(): void {
    if (this.shelterId) {
      this.store.dispatch(ShelterActions.getAnimalsShelter({ shelterId: this.shelterId }));
    }
  }

  goToAnimalDetail(animalId: number) {
    this.router.navigateByUrl('/detalle-mascota/' + animalId);
  }

  goToBack() :void {
    this.location.back();
  }

}
