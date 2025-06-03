import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ShelterActions from './../../../Shelters/actions';
import * as BreederActions from './../../../Breeders/actions';
import { AnimalDTO } from './../../models/animal.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-animal-applications',
  templateUrl: './animal-applications.component.html',
  styleUrls: ['./animal-applications.component.scss']
})
export class AnimalApplicationsComponent {

  applicationsAnimalsShelter$: Observable<any | null> = of(null);
  applicationsAnimalsBreeder$: Observable<any | null> = of(null);
  shelterId: any;
  breederId: any;
  rolUser: any;
  displayedColumns: string[] = ['id', 'name', 'location', 'user', 'email',  'reason', 'housing_stage' ,'publication_date', 'actions' ];
  dataSource: MatTableDataSource<AnimalDTO> = new MatTableDataSource();

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  private destroy$ = new Subject<void>()
  constructor(private router: Router, private store: Store<AppState>, private dialog: MatDialog,) {

      this.store.select('auth').subscribe((auth) => {
    if (auth.user?.role_id === 3) {
      this.shelterId = auth.user.shelter?.id;
      this.rolUser = 3;
      this.applicationsAnimalsShelter$ = this.store.select(state => state.shelter.shelterApplications);
    } else if (auth.user?.role_id === 4) {
      this.breederId = auth.user.breeder?.id;
      this.rolUser = 4;
      this.applicationsAnimalsBreeder$ = this.store.select(state => state.breeder.breederApplications);
    }
    this.loadApplicationsShelter(this.shelterId);
    this.loadApplicationsBreeder(this.breederId);
    });

    this.loading$ = this.store.select(state => state.shelter.loading || state.breeder.loading);
    this.loaded$ = this.store.select(state => state.shelter.loaded || state.breeder.loaded);
  }


    loadApplicationsShelter(shelterId : any): void {
      if (this.shelterId) {
        this.store.dispatch(ShelterActions.getApplicationsShelter({ shelterId: shelterId }));
      }
      this.applicationsAnimalsShelter$
      .pipe(takeUntil(this.destroy$))
      .subscribe((applicationsAnimals: AnimalDTO[]) => {
        this.dataSource.data = applicationsAnimals;
          setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      });
    }

    loadApplicationsBreeder(breederId : any): void {
      if (this.breederId) {
        this.store.dispatch(BreederActions.getApplicationsBreeder({ breederId: breederId }));
      }
      this.applicationsAnimalsBreeder$
      .pipe(takeUntil(this.destroy$))
      .subscribe((applicationsAnimals: AnimalDTO[]) => {
        this.dataSource.data = applicationsAnimals;
          setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      });
    }

    ngAfterViewInit(): void {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    }

    goToAnimalDetail(animalId: number) {
    this.router.navigateByUrl('/detalle-mascota/' + animalId);
    }

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
