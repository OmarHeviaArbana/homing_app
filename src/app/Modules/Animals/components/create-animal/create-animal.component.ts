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
import { Observable } from 'rxjs';
import { UserDTO } from 'src/app/Modules/Users/models/user.dto';

@Component({
  selector: 'app-create-animal',
  templateUrl: './create-animal.component.html',
  styleUrls: ['./create-animal.component.scss']
})
export class CreateAnimalComponent {
  form: FormGroup;
  formPublicAnimal!: FormGroup;
  auth: any | null = null;
  user: any;

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


    this.store.select('auth').subscribe((auth) => {
      this.auth = auth?.user;
      this.user = this.auth
      console.log(this.user.shelter.id);

    });
    }

    onAnimalFormReady(form: FormGroup) {
      this.formPublicAnimal = form;
    }

    publicAnimal(): void {

      if (this.formPublicAnimal.invalid) return;

      const animal: AnimalDTO = {
          ...this.formPublicAnimal.value,
          shelter_id: this.user.role_id == 3 ? this.user.shelter.id : null,
          breeder_id: this.user.role_id == 4 ? this.user.breeder.id : null
      };


      if (this.formPublicAnimal.invalid) return;

      const animalData: Partial<AnimalDTO> = this.formPublicAnimal.value


      this.store.dispatch(AnimalActions.saveAnimalFormData({ animalFormData: animalData }));
      this.store.dispatch(AnimalActions.createAnimal({ animal}));
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
