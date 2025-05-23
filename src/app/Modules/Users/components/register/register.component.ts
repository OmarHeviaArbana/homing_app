import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShelterDTO } from 'src/app/Modules/Shelters/models/shelter.dto';
import { BreederDTO } from 'src/app/Modules/Breeders/models/breeder.dto';
import * as AuthAction from './../../../Auth/actions';
import { LoginDTO } from 'src/app/Modules/Auth/models/login.dto';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  {

  registerUser: UserDTO;
  registerShelter: ShelterDTO;
  registerBreeder: BreederDTO;

  name: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  role_id: FormControl;

  name_second: FormControl;
  logo_url: FormControl;
  address: FormControl;
  location: FormControl;
  description: FormControl;
  phone: FormControl;

  email_breeder: FormControl;
  email_shelter: FormControl;
  cif: FormControl;
  certification: FormControl;

  registerFormUser: FormGroup;
  registerFormShelterBreeder: FormGroup;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  rolUserList: any;

  constructor( private router: Router, private formBuilder: FormBuilder,private store: Store<AppState>) {
    this.registerUser = new UserDTO('','','', '', '');
    this.registerShelter = new ShelterDTO('','','', '', '', '','','', '');
    this.registerBreeder = new BreederDTO('','','', '', '', '','','', '');
    this.rolUserList = [
        {
          id: 2,
          name: "Adoptante"
        },
        {
          id: 3,
          name: "Refugio"
        },
        {
          id: 4,
          name: "Criadero"
        }
    ]

    this.name = new FormControl(this.registerUser.name, [
      Validators.required,
    ]);

    this.name_second = new FormControl(this.registerBreeder.name, [
      Validators.required,
    ]);

    this.username = new FormControl(this.registerUser.username, [
      Validators.required,
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);
    this.email_breeder = new FormControl(this.registerBreeder.email_breeder, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.email_shelter = new FormControl(this.registerBreeder.email_breeder, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.role_id = new FormControl(this.registerUser.role_id, [
      Validators.required,
    ]);

    this.logo_url = new FormControl(this.registerBreeder.logo_url, [
      Validators.required,
    ]);

    this.address = new FormControl(this.registerBreeder.address, [
      Validators.required,
    ]);

    this.location = new FormControl(this.registerBreeder.location, [
      Validators.required,
    ]);

    this.description = new FormControl(this.registerBreeder.description, [
      Validators.required,
      Validators.maxLength(300),
    ]);

    this.phone = new FormControl(this.registerBreeder.phone, [
      Validators.required,
      Validators.pattern(/^(\+34|0034|34)?[6|7|9][0-9]{8}$/) /* 612345678, +34612345678, 0034612345678 */
    ]);

    this.cif = new FormControl(this.registerShelter.cif, [

      Validators.required,
      Validators.pattern(/^[A-HJ-NP-SUVW][0-9]{7}[0-9A-J]$/i)  /*  A12345678 , C1234567X */

    ]);

    this.certification = new FormControl(this.registerBreeder.certification, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]);




  this.registerFormUser = this.formBuilder.group({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.role_id,
  });

  this.registerFormShelterBreeder = this.formBuilder.group({
      name_second: this.name_second,
     /*  logo_url: this.logo_url, */
      address: this.address,
      location: this.location,
      description: this.description,
      phone: this.phone,
      email_shelter: this.email_shelter,
      email_breeder: this.email_breeder,
      cif: this.cif,
      certification: this.certification
  });

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  register(): void {
    if (this.registerFormUser.invalid) return;

    const user = this.registerFormUser.value;
    this.store.dispatch(UserAction.register({ user }));

    this.store.select('auth').subscribe({
      next: (userRegister: any) => {
        const registeredUser = userRegister.user;
        console.log(registeredUser);

        if (registeredUser.role_id === 2) {
          this.registerFormUser.reset();
          return;
        }

        if (this.registerFormShelterBreeder.invalid) return;

        const isShelter = registeredUser.user.role_id === 3;
        const entityEmailKey = isShelter ? 'email_shelter' : 'email_breeder';
        const entityIdKey = isShelter ? 'cif' : 'certification';

        const formValue = this.registerFormShelterBreeder.value;
        const entity = {
          user_id: registeredUser.user.id,
          name: formValue.name,
          logo_url: formValue.logo_url,
          address: formValue.address,
          location: formValue.location,
          description: formValue.description,
          phone: formValue.phone,
          [entityEmailKey]: formValue[entityEmailKey],
          [entityIdKey]: formValue[entityIdKey]
        };

        console.log(isShelter ? 'Shelter' : 'Breeder', entity);
        console.log(entity);


          this.registerFormShelterBreeder.reset();
      },
      error: (err: any) => {
        console.error('Error registering user or entity:', err);
      }
    });
  }

 /*  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      console.warn('No file selected or file input is unusable.');
      return;
    }

    const file = input.files[0];
    console.log(file);



    this.registerFormShelterBreeder.patchValue({
      logo_url: file
    });

    this.registerFormShelterBreeder.get('logo_url')?.updateValueAndValidity();

  } */



  getErrorNameMessage(): any {
    if (this.name.hasError('required')) {
      return 'Campo obligatorio'
    }
  }
  getErrorUserNameMessage(): any {
    if (this.username.hasError('required')) {
      return 'Campo Obligatorio'
    }
  }
  getErrorPhoneMessage(): any {
    if (this.phone.hasError('required')) {
      return 'Campo Obligatorio'
    }
     if (this.phone.hasError('pattern') && !this.phone.hasError('required')) {
      return 'El formato del teléfono no es válido'
    }
  }

  getErrorLocationMessage(): any {
    if (this.phone.hasError('required')) {
      return 'Campo Obligatorio'
    }
  }

  getErrorCifMessage(): any {
    if (this.cif.hasError('required')) {
      return 'Campo Obligatorio'
    }
     if (this.cif.hasError('pattern') && !this.cif.hasError('required')) {
      return 'El formato del CIF no es valido'
    }
  }

  getErrorCertificationMessage(): any {
    if (this.certification.hasError('required')) {
      return 'Campo Obligatorio'
    }
  }

  getErrorDescriptionMessage(): any {
    if (this.description.hasError('required')) {
      return 'Campo Obligatorio'
    }

    if (this.description.hasError('maxlength') && !this.description.hasError('required')) {
      return 'La descripción no puede ser de más de 300 carácteres'
    }
  }

  getErrorEmailMessage(): any {
    if (this.role_id.value === 3 && this.email_shelter.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.role_id.value === 3 && this.email_shelter.hasError('pattern')) {
      return 'El formato del email no es válido';
    }
    if (this.role_id.value === 4 && this.email_breeder.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.role_id.value === 4 && this.email_breeder.hasError('pattern')) {
      return 'El formato del email no es válido';
    }
    if (this.role_id.value !== 3 && this.role_id.value !== 4 && this.email.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.role_id.value !== 3 && this.role_id.value !== 4 && this.email.hasError('pattern')) {
      return 'El formato del email no es válido';
    }
  }

  getErrorPasswordMessage(): any {
    if (this.password.hasError('required')) {
      return 'Campo obligatorio'
    }
    if (this.password.hasError('minlength') && !this.password.hasError('required')) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
  }
}
