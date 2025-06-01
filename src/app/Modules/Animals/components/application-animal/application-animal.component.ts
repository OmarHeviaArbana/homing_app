import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AnimalDTO } from '../../models/animal.dto';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Shared/Components/dialog/dialog.component';
import * as AnimalActions from '../../actions';


@Component({
  selector: 'app-application-animal',
  templateUrl: './application-animal.component.html',
  styleUrls: ['./application-animal.component.scss']
})
export class ApplicationAnimalComponent implements OnInit {

  formApplicationAnimal!: FormGroup;
  auth: any | null = null;
  user: any;
  animal: any;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {

  this.store.select('auth').subscribe((auth) => {
    this.auth = auth?.user;
    this.user = this.auth
  });

  const navigation = this.router.getCurrentNavigation();
  const animal = navigation?.extras?.state?.['animal'];
  this.animal = animal
  console.log(this.animal);
  }

  ngOnInit(): void {
      this.formApplicationAnimal = this.formBuilder.group({
      reason: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
    });
      this.formApplicationAnimal.patchValue({
      name: this.user.name,
      username: this.user.username,
      email:this.user.email
    });

      this.formApplicationAnimal.get('name')?.disable();
      this.formApplicationAnimal.get('username')?.disable();
      this.formApplicationAnimal.get('email')?.disable();

  }
  applicationAnimal(): void {

    if (this.formApplicationAnimal.invalid) return;
console.log(this.animal);


    const application = {
      ...this.formApplicationAnimal.value,
      shelter_id: this.animal.shelter_id !== null ? this.animal.shelter_id : null,
      breeder_id: this.animal.breeder_id !== null ? this.animal.breeder_id : null,
      user_id: this.user.id,
      animal_id: this.animal.id,
      housing_stage_id: 1
    };

    this.store.dispatch(AnimalActions.applicationAnimal({ application}));
  }

  get reason() {
    return this.formApplicationAnimal.get('reason');
  }

  getErrorMessage(controlName: string): string {
    const control = this.formApplicationAnimal.get(controlName);
    if (control?.hasError('required')) return 'Campo obligatorio';
    return '';
  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Atención',
        content: '¿Estás seguro/a de que deseas continuar, ya que se perderan los datos de la solicitud de adopción?',
        onConfirm: () => this.cancel()
      }
    });
  }

  cancel() {
    this.formApplicationAnimal.reset();
    this.location.back();
  }
}
