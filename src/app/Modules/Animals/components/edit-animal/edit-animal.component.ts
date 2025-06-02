import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AnimalDTO } from '../../models/animal.dto';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Shared/Components/dialog/dialog.component';
import * as AnimalActions from '../../actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-animal',
  templateUrl: './edit-animal.component.html',
  styleUrls: ['./edit-animal.component.scss']
})
export class EditAnimalComponent  {
    form: FormGroup;
    formPublicAnimal!: FormGroup;
    auth: any | null = null;
    user: any;
    selectedFiles: { [key: string]: File | null } = {};
    animalDetail$: Observable<any| null>;
    currentAnimalData: any | null = null;
    animalId: any;

    constructor(
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private router: Router,
      private location: Location,
      private dialog: MatDialog,
      private activatedRoute: ActivatedRoute,
    ) {

      this.animalId = this.activatedRoute.snapshot.paramMap.get('id') ?? '';
      this.animalDetail$ = this.store.select(state => state.animals.animalDetail);

      this.loadDetailAnimal()
      this.form = this.formBuilder.group({
        animal: this.formPublicAnimal,
      });


    this.store.select('auth').subscribe((auth) => {
      this.auth = auth?.user;
      this.user = this.auth
      });

    }


    loadDetailAnimal(): void {
        if (this.animalId) {
          this.store.dispatch(AnimalActions.getAnimalById({ animalId: this.animalId }));
          this.animalDetail$.subscribe((animal: AnimalDTO[]) => {
            this.currentAnimalData = animal;
          });

          setTimeout(() => {
            this.formPublicAnimal.patchValue(this.currentAnimalData);
            this.formPublicAnimal.markAllAsTouched();
          }, 300);
      }
    }

    onAnimalFormReady(form: FormGroup) {
      this.formPublicAnimal = form;
    }

    onFilesChanged(files: { [key: string]: File | null }) {
      this.selectedFiles = files;
    }

    openDialog(): void {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Atención',
          content: '¿Estás seguro/a de que deseas continuar con la edición, se perderan los datos de la mascota que hayas modificado?',
          onConfirm: () => this.cancel()
        }
      });
    }
    openDialogUpdate(): void {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Atención',
          content: '¿Vas a modificar los datos de una mascota, estas seguro/a de los cambios efectuados?',
          onConfirm: () => this.updateAnimal()
        }
      });
    }
    cancel() {
      this.formPublicAnimal.reset();
      this.location.back();
    }
    updateAnimal() {
      if (this.formPublicAnimal.invalid) return;
        const animal: AnimalDTO = {
        ...this.formPublicAnimal.value,
        housing_stage_id: 1,
        files: this.selectedFiles !== null ? this.selectedFiles : null
      };
      if (this.animalId) {
         this.store.dispatch(AnimalActions.setFilesFormData({ files: this.selectedFiles}));
        this.store.dispatch(AnimalActions.updateAnimal({ animalId: this.animalId, animal: animal }));
      }
      this.formPublicAnimal.reset();

    }

}
