import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as ShelterActions from './../../../Shelters/actions';
import * as BreederActions from './../../../Breeders/actions';
import * as UserActions from './../../actions';
import { AnimalDTO } from './../../../Animals/models/animal.dto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-animal-user-applications',
  templateUrl: './animal-user-applications.component.html',
  styleUrls: ['./animal-user-applications.component.scss']
})
export class AnimalUserApplicationsComponent {

    applicationsAnimalsUser$: Observable<any | null> = of(null);

    user: any;
    rolUser: any;
    displayedColumns: string[] = ['id', 'name', 'location', 'user', 'email',  'reason', 'housing_stage' ,'publication_date', 'actions' ];
    dataSource: MatTableDataSource<any> = new MatTableDataSource();
      mainData!: Observable<{ label: string; value: string | number | boolean }[]>;
  healthData!: Observable<{ label: string; value: string | number | boolean}[]>;

    loading$: Observable<boolean>;
    loaded$: Observable<boolean>;

    @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
    private destroy$ = new Subject<void>()
    constructor(private router: Router, private store: Store<AppState>, private dialog: MatDialog,) {


      this.store.select('auth').subscribe((auth) => {
        this.user = auth.user;
       // this.applicationsAnimalsUser$ = this.store.select(state => state.user.userApplications);
        this.loadApplicationsUser();
      });
    this.applicationsAnimalsUser$ = this.store.select(state => state.user.userApplications)


      this.loading$ = this.store.select(state => state.user.loading );
      this.loaded$ = this.store.select(state => state.user.loaded );
    }


      loadApplicationsUser(): void {
        if (this.user.id) {
          this.store.dispatch(UserActions.getApplicationsUser({ userId: this.user.id }));
        }
        this.applicationsAnimalsUser$
        .pipe(takeUntil(this.destroy$))
        .subscribe((applicationsUser: AnimalDTO[]) => {
          this.dataSource.data = applicationsUser;
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
