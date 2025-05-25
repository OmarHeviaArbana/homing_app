import { Component } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserActions from '../../actions';
import * as ShelterActions from '../../../Shelters/actions';
import * as BreederActions from '../../../Breeders/actions';
import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';

import { ShelterDTO } from 'src/app/Modules/Shelters/models/shelter.dto';
import { BreederDTO } from 'src/app/Modules/Breeders/models/breeder.dto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  formUser!: FormGroup;
  formShelter!: FormGroup;
  formBreeder!: FormGroup;

  selectedRoleId!: number;
  userId!: string;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {

    this.form = this.formBuilder.group({
    user: this.formUser,
    shelter: this.formShelter,
    breeder: this.formBreeder,

  });

  this.loading$ = this.store.select((state) => state.auth.loading);
  this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  onUserFormReady(form: FormGroup) {
    this.formUser = form;
  }

  onShelterFormReady(form: FormGroup) {
    this.formShelter = form;
  }

  onBreederFormReady(form: FormGroup) {
    this.formBreeder = form;
  }

  onRoleSelected(roleId: number) {
    this.selectedRoleId = roleId;
  }

/*  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    this.logo_url.setValue(null);
    this.logo_url.updateValueAndValidity();
    return;
  }

  const file = input.files[0];
  this.logo_url.setValue(file);
  this.logo_url.updateValueAndValidity();


} */


  register(): void {

    if (this.formUser.invalid) return;

    const user: UserDTO = this.formUser.value;

    if (this.selectedRoleId === 3) {
      if (this.formShelter.invalid) return;
      const shelterData: Partial<ShelterDTO> = this.formShelter.value;
      this.store.dispatch(ShelterActions.saveShelterFormData({ shelterFormData: shelterData }));
    }
    if (this.selectedRoleId === 4) {
      if (this.formBreeder.invalid) return;
      const BreederData: Partial<BreederDTO> = this.formBreeder.value;
      console.log(BreederData);
      this.store.dispatch(BreederActions.saveBreederFormData({ breederFormData: BreederData }));
    }
    this.store.dispatch(UserActions.register({ user }));
  }

  cancel() {
    this.formUser.reset();
    if (this.formShelter) {
      this.formShelter.reset();
    } else if (this.formBreeder) {
      this.formBreeder.reset();
    }
    this.selectedRoleId = 0;
    this.router.navigateByUrl('/');
  }
}
