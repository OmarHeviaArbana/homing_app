import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup  } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserActions from '../../actions';
import * as ShelterActions from '../../../Shelters/actions';
import * as BreederActions from '../../../Breeders/actions';
import { UserDTO } from './../../models/user.dto';
import { ShelterDTO } from 'src/app/Modules/Shelters/models/shelter.dto';
import { BreederDTO } from 'src/app/Modules/Breeders/models/breeder.dto';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/Shared/Components/dialog/dialog.component';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  formUser!: FormGroup;
  formShelter!: FormGroup;
  formBreeder!: FormGroup;

  selectedRoleId!: number;
  userId!: number;

  isEditMode = false;
  currentUserData: UserDTO | null = null;

  selectedFiles: any= {};

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {

    this.form = this.formBuilder.group({
      user: this.formUser,
      shelter: this.formShelter,
      breeder: this.formBreeder,
    });

    const currentUrl = this.router.url;
    this.isEditMode = currentUrl.includes('/mi-perfil');

    if (this.isEditMode) {
      this.store.select('auth').subscribe((authState) => {
        if (authState?.user) {
          this.currentUserData = authState.user;
          this.selectedRoleId = authState.user.role_id;
        }
      });
    }
  }
  ngOnInit(): void {
  }
  onUserFormReady(form: FormGroup) {
    this.formUser = form;
    if (this.isEditMode && this.currentUserData) {
      this.formUser.patchValue({
        name: this.currentUserData.name,
        username: this.currentUserData.username,
        email: this.currentUserData.email,
        role_id: this.currentUserData.role_id,
      });
      this.formUser.get('role_id')?.disable();
      this.formUser.get('email')?.disable();
      this.formUser.markAllAsTouched();
      this.formUser.updateValueAndValidity();
    }
  }

  onShelterFormReady(form: FormGroup) {
    this.formShelter = form;
    if (this.isEditMode && this.selectedRoleId === 3 && this.currentUserData?.shelter) {
      this.formShelter.patchValue(this.currentUserData.shelter);
      this.formShelter.markAllAsTouched();
      this.formShelter.updateValueAndValidity();

    }
  }

  onBreederFormReady(form: FormGroup) {
    this.formBreeder = form;
     if (this.isEditMode && this.selectedRoleId === 4 && this.currentUserData?.breeder) {
      this.formBreeder.patchValue(this.currentUserData.breeder);
      this.formBreeder.markAllAsTouched();
      this.formBreeder.updateValueAndValidity();
    }
  }

  onFilesChanged(files: { [key: string]: File | null }) {
    this.selectedFiles = files;
  }


  onRoleSelected(roleId: number) {
    this.selectedRoleId = roleId;
  }

  register(): void {

    if (this.formUser.invalid) return;

    const user: UserDTO =  {
      ...this.formUser.value,

    }
    console.log(user);

    if (this.selectedRoleId === 3) {
      if (this.formShelter.invalid) return;

      const shelterData: Partial<ShelterDTO> = {
        ...this.formShelter.value,
        files: this.selectedFiles.logo_url
      };
      this.store.dispatch(ShelterActions.saveShelterFormData({ shelterFormData: shelterData }));
      this.store.dispatch(ShelterActions.uploadShelterLogo({ files: this.selectedFiles}));
    }
    if (this.selectedRoleId === 4) {
      if (this.formBreeder.invalid) return;

      const BreederData: Partial<BreederDTO> =  {
        ...this.formBreeder.value,
        files: this.selectedFiles.logo_url
      }

      this.store.dispatch(BreederActions.saveBreederFormData({ breederFormData: BreederData }));
      this.store.dispatch(BreederActions.uploadBreeederLogo({ files: this.selectedFiles.logo_url}));
    }

    this.store.dispatch(UserActions.register({ user }));
  }

  update(): void {
    if (this.formUser.invalid) return;

    const userFormValues = this.formUser.getRawValue();
    const userId = this.currentUserData?.id;

    if (userId) {
      this.store.dispatch(UserActions.updateUser({ userId: userId, user: userFormValues }));
    }
    if (this.selectedRoleId === 3 && this.formShelter.valid && this.currentUserData?.shelter) {
    const shelterId : any =  this.currentUserData.shelter.id;
      this.store.dispatch(ShelterActions.uploadShelterLogo({ files: this.selectedFiles.logo_url}));
      this.store.dispatch(
        ShelterActions.updateShelter({
          ... this.formShelter.value,
          shelterId: shelterId,
          files: this.selectedFiles.logo_url

        })
      );
    }

    if (this.selectedRoleId === 4 && this.formBreeder.valid && this.currentUserData?.breeder) {
      const breederId : any = this.currentUserData.breeder.id;
      this.store.dispatch(BreederActions.uploadBreeederLogo({ files: this.selectedFiles.logo_url}));
      this.store.dispatch(
        BreederActions.updateBreeder({
          ...this.formBreeder.value,
          breederId: breederId,
          files: this.selectedFiles.logo_url
        })
      );
    }
    this.isEditMode = false

  }

  openDialog(): void {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Atención',
        content: '¿Estás seguro/a de que deseas continuar, ya que se perderan los datos de la mascota ya cumplimentados?',
        onConfirm: () => this.cancel()
      }
    });
  }

  cancel() {
    this.formUser.reset();
    this.formShelter?.reset();
    this.formBreeder?.reset();
    this.selectedRoleId = 0;
    this.location.back();
  }
}
