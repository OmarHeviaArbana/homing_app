import { Component } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AnimalDTO } from '../../models/animal.dto';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Shared/Components/dialog/dialog.component';
import * as AnimalActions from '../../actions';

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.scss']
})
export class CreateAnimalComponent {
  form: FormGroup;
  formPublicAnimal!: FormGroup;

    constructor(
      private formBuilder: FormBuilder,
      private store: Store<AppState>,
      private router: Router,
      private location: Location,
      private dialog: MatDialog
    ) {

      this.form = this.formBuilder.group({
        animal: this.formPublicAnimal,
      });
    }

    onAnimalFormReady(form: FormGroup) {
      this.formPublicAnimal = form;
    }

    publicAnimal(): void {

      if (this.formPublicAnimal.invalid) return;

      const animal: AnimalDTO = this.formPublicAnimal.value;

      if (this.formPublicAnimal.invalid) return;
      const animalData: Partial<AnimalDTO> = this.formPublicAnimal.value;
      this.store.dispatch(AnimalActions.saveAnimalFormData({ animalFormData: animalData }));
      this.store.dispatch(AnimalActions.createAnimal({ animal }));
    }

    openDialog(): void {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Confirmación',
          content: '¿Estás seguro de que deseas continuar, se perderan los datos de la mascota ya cumplimentados?',
          onConfirm: () => this.cancel()
        }
      });
    }
    cancel() {
      this.formPublicAnimal.reset();
      this.location.back();
  }

}
