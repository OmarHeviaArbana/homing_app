import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ShelterActions from './../../../Shelters/actions';
import * as BreederActions from './../../../Breeders/actions';
import * as AnimalActions from './../../actions'
import { AnimalDTO } from './../../models/animal.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DialogComponent } from 'src/app/Shared/Components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-animals-control',
  templateUrl: './animals-control.component.html',
  styleUrls: ['./animals-control.component.scss']
})
export class AnimalsControlComponent {

  animalsShelter$: Observable<any | null> = of(null);
  animalsBreeder$: Observable<any | null> = of(null);
  shelterId: any;
  breederId: any;
  rolUser: any;
  shelterData!: Observable<{ label: string; value: string | number | boolean }[]>;
  displayedColumns: string[] = ['id', 'name', 'location', 'species', 'genre', 'age_category', 'size', 'height', 'weight', 'status', 'housing_stage' ,'publication_date', 'actions', ];
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
      this.animalsShelter$ = this.store.select(state => state.shelter.animalsShelter);
    } else if (auth.user?.role_id === 4) {
      this.breederId = auth.user.breeder?.id;
      this.rolUser = 4;
      this.animalsBreeder$ = this.store.select(state => state.breeder.animalsBreeder);
    }
    this.loadAnimalsShelter(this.shelterId);
    this.loadAnimalsBreeder(this.breederId);
    });

    this.loading$ = this.store.select(state => state.shelter.loading || state.breeder.loading);
    this.loaded$ = this.store.select(state => state.shelter.loaded || state.breeder.loaded);
  }



    loadAnimalsShelter(shelterId : any): void {
      if (this.shelterId) {
        this.store.dispatch(ShelterActions.getAnimalsShelter({ shelterId: shelterId }));
      }
     this.animalsShelter$
      .pipe(takeUntil(this.destroy$))
      .subscribe((animals: AnimalDTO[]) => {
        this.dataSource.data = animals;
         setTimeout(() => {
          if (this.paginator) {
            this.dataSource.paginator = this.paginator;
          }
        });
      });
    }

    loadAnimalsBreeder(breederId : any): void {
      if (this.breederId) {
        this.store.dispatch(BreederActions.getAnimalsBreeder({ breederId: breederId }));
      }
      this.animalsBreeder$
      .pipe(takeUntil(this.destroy$))
      .subscribe((animals: AnimalDTO[]) => {
        this.dataSource.data = animals;
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

    goToPublicAnimals() {
      this.router.navigateByUrl('publicar-mascota');
    }

    updateAnimal(animalId: string): void {
      this.router.navigateByUrl('/editar-mascota/' + animalId);
    }

    openDialogDelete(id: any): void {
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Atención',
              content: '¿Vas a eliminar la mascota, estas seguro/a de ello, ya que este cambio es irreversible y se perderan sus datos?',
              onConfirm: () => this.deleteAnimal(id)
            }
          });
        }

    deleteAnimal(id :any): void {
      this.store.dispatch(AnimalActions.deleteAnimal({ id }));
      if (this.rolUser == 3) {
        this.loadAnimalsShelter(this.shelterId)

      } else {
        this.loadAnimalsBreeder(this.shelterId)
      }

    }
    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
