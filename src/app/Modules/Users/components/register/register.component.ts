import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserActions from '../../actions';
import * as ShelterActions from '../../../Shelters/actions';
import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShelterDTO } from 'src/app/Modules/Shelters/models/shelter.dto';
import { BreederDTO } from 'src/app/Modules/Breeders/models/breeder.dto';
import * as AuthAction from './../../../Auth/actions';
import { LoginDTO } from 'src/app/Modules/Auth/models/login.dto';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form!: FormGroup;
  formUser!: FormGroup;
  formShelter!: FormGroup;
  /* formShelter!: FormGroup; */
  formBreeder!: FormGroup;

  selectedRoleId!: number;
  userId!: string;

  /* registerUser: UserDTO;
  registerShelter: ShelterDTO;
  registerBreeder: BreederDTO;

  name: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  role_id: FormControl;

  name_shelter: FormControl;
  logo_url: FormControl;
  address: FormControl;
  location: FormControl;
  description: FormControl;
  phone: FormControl; */

 /*  email_breeder: FormControl; */
 /*  email_shelter: FormControl; */
/*   cif: FormControl; */
/*   certification: FormControl; */

/*   registerFormUser: FormGroup;
  registerFormShelter: FormGroup; */

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;


/*   rolUserList: any; */

  constructor( private router: Router, private formBuilder: FormBuilder,private store: Store<AppState>) {

    this.form = this.formBuilder.group({
    user: this.formUser,
    shelter: this.formShelter,

  });



    /* this.registerUser = new UserDTO('','','', '', '');
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
    ] */

  /*   this.name = new FormControl(this.registerUser.name, [
      Validators.required,
    ]);

    this.name_shelter = new FormControl(this.registerShelter.name, [
      Validators.required,
    ]);

    this.username = new FormControl(this.registerUser.username, [
      Validators.required,
    ]);

    this.email = new FormControl(this.registerUser.email, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]); */
  /*   this.email_breeder = new FormControl(this.registerBreeder.email_breeder, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]); */

   /*  this.email_shelter = new FormControl(this.registerShelter.email_shelter, [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl(this.registerUser.password, [
      Validators.required,
      Validators.minLength(8),
    ]); */

    /* this.role_id = new FormControl(this.registerUser.role_id, [
      Validators.required,
    ]); */

   /*  this.logo_url = new FormControl(this.registerBreeder.logo_url, [
      Validators.required,
    ]); */
   /*  this.logo_url = new FormControl(this.registerShelter.logo_url, [
      Validators.required,
    ]); */

   /*  this.address = new FormControl(this.registerShelter.address, [
      Validators.required,
    ]); */
  /*   this.address = new FormControl(this.registerBreeder.address, [
      Validators.required,
    ]); */

    /* this.location = new FormControl(this.registerShelter.location, [
      Validators.required,
    ]); */

  /*   this.location = new FormControl(this.registerBreeder.location, [
      Validators.required,
    ]);
 */
   /*  this.description = new FormControl(this.registerShelter.description, [
      Validators.required,
      Validators.maxLength(300),
    ]); */

  /*   this.phone = new FormControl(this.registerShelter.phone, [
      Validators.required,
      Validators.pattern(/^(\+34|0034|34)?[6|7|9][0-9]{8}$/)  */
      /* 612345678, +34612345678, 0034612345678 */
 /*    ]); */
  /*   this.description = new FormControl(this.registerBreeder.description, [
      Validators.required,
      Validators.maxLength(300),
    ]); */

 /*    this.cif = new FormControl(this.registerShelter.cif, [

      Validators.required,
      Validators.pattern(/^[A-HJ-NP-SUVW][0-9]{7}[0-9A-J]$/i)  /*  A12345678 , C1234567X */

  /*   ]); */

   /*  this.certification = new FormControl(this.registerBreeder.certification, [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]); */




/*   this.registerFormUser = this.formBuilder.group({
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.role_id,
  }); */

/*   this.registerFormShelter = this.formBuilder.group({
      name_shelter: this.name_shelter,
      logo_url: this.logo_url,
      address: this.address,
      location: this.location,
      description: this.description,
      phone: this.phone,
      email_shelter: this.email_shelter,
     email_breeder: this.email_breeder,
      cif: this.cif,

  }); */
/*   console.log(this.registerFormShelter);
 */

 this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

   onUserFormReady(form: FormGroup) {
    this.formUser = form;
  }

  onShelterFormReady(form: FormGroup) {
    this.formShelter = form;
  }

  onRoleSelected(roleId: number) {
    this.selectedRoleId = roleId;
     /* if (roleId !== 3) {
      this.formShelter = null; // limpia el formulario refugio si no aplica
    } */
  }




 /*  onBreederFormReady(form: FormGroup) {
    this.formBreeder = form;
  }
 */
/*   ngOnInit(): void {
  this.role_id.valueChanges.subscribe((role) => {
    if (role === 3) {
      this.email_shelter.enable();
      this.cif.enable();

      this.email_breeder.disable();
      this.certification.disable();
    } else if (role === 4) {
      this.email_breeder.enable();
      this.certification.enable();

      this.email_shelter.disable();
      this.cif.disable();
    } else {
      this.email_shelter.disable();
      this.cif.disable();
      this.email_breeder.disable();
      this.certification.disable();
    }

    this.email_shelter.updateValueAndValidity();
    this.email_breeder.updateValueAndValidity();
    this.cif.updateValueAndValidity();
    this.certification.updateValueAndValidity();
  }); */

  // Inicialmente deshabilitados
  /* this.email_shelter.disable();
  this.cif.disable();
  this.email_breeder.disable();
  this.certification.disable();
} */


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

    // Si es refugio, guarda datos del shelter
    console.log(this.selectedRoleId);

    if (this.selectedRoleId === 3) {
      const shelterData: Partial<ShelterDTO> = this.formShelter.value;
      console.log(shelterData);

      this.store.dispatch(ShelterActions.saveShelterFormData({ shelterFormData: shelterData }));
    }

    this.store.dispatch(UserActions.register({ user }));
  }

    /* } */ /* lse {
    }
   console.log(user);

    //this.store.dispatch(UserActions.register({ user }));

    // Despacha acción de registro de usuario
    this.store.dispatch(UserActions.register({ user }));
  }
/*     console.log("register app user");
      if (this.formUser.invalid) {
    this.formUser.markAllAsTouched();
    return;
  }



    const user= this.formUser.value;
    this.store.dispatch(UserAction.register({ user }));
    console.log(user);
 */
   /*  this.store.select('user').pipe(filter(user => !!user),take(1)).subscribe(userState => {
    const registeredUser = userState.user;

    if (!registeredUser) {
      // Manejar error o esperar
      return;
    } */
/*     if (this.selectedRoleId === 3) {
    if (!this.formShelter || this.formShelter.invalid) {
      this.formShelter.markAllAsTouched();
      return;
    }

    const shelterData = this.formShelter.value;
    console.log(shelterData);
      this.store.dispatch(ShelterActions.saveShelterFormData({ shelterFormData: shelterData }));
    }
 */







   /*  if (this.selectedRoleId === 3) {
      if (!this.formShelter || !this.formShelter.valid) return;

      if (this.selectedRoleId === 3) {
      if (!this.formShelter || this.formShelter.invalid) {
        this.formShelter.markAllAsTouched();
        return;
      }
      const shelterData = { ...this.formShelter.value, user_id: registeredUser};
      console.log(shelterData) */
      // Aquí despacha acción para registrar shelter
      //this.store.dispatch(UserAction.registerShelter({ shelter: shelterData }));

    /* } */ /* else if (this.selectedRoleId === 4) {
      if (!this.formBreeder || this.formBreeder.invalid) {
        this.formBreeder.markAllAsTouched();
        return;
      }
      const breederData = { ...this.formBreeder.value, user_id: registeredUser.id };
      // Aquí despacha acción para registrar breeder
      this.store.dispatch(UserAction.registerBreeder({ breeder: breederData }));
    } *//* } */
/*   }); */

  /*   const fullData = {
      ...user,
      ...this.formShelter.value,
    };
    console.log(fullData); */

/*   } */

   /*  this.store.dispatch(UserAction.register({ user })); */

   /*  if (this.registerFormUser.invalid) return;

    const user = this.registerFormUser.value;
    this.store.dispatch(UserAction.register({ user }));

    this.store.select('user').pipe(take(1)).subscribe({
      next: (userRegister: any) => {
        const registeredUser = userRegister.user;
        console.log(registeredUser);

        if (registeredUser.role_id === 2) {
          this.registerFormUser.reset();
          return;
        }

        if (this.registerFormShelter.invalid) return;

        const isShelter = registeredUser.user.role_id === 3;
        const entityEmailKey = isShelter ? 'email_shelter' : 'email_breeder';
        const entityIdKey = isShelter ? 'cif' : 'certification';

        const formValue = this.registerFormShelter.value;
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


          this.registerFormShelter.reset();
      },
      error: (err: any) => {
        console.error('Error registering user or entity:', err);
      }
    }); */


  cancel() {
    this.formUser.reset();
    if (this.formShelter) {
      this.formShelter.reset();
    }
    this.selectedRoleId = 0;
  }

   /*  registerAppCenter(): void {
      console.log("JOla registerApp Center");

    if (this.registerFormUser.invalid) return;

    const user = this.registerFormUser.value;
    this.store.dispatch(UserAction.register({ user }));

    this.store.select('user').pipe(take(1)).subscribe({
      next: (userRegister: any) => {
        const registeredUser = userRegister.user;
        console.log(registeredUser);

        if (registeredUser.role_id === 2) {
          this.registerFormUser.reset();
          return;
        }

        if (this.registerFormShelter.invalid) return;

        const isShelter = registeredUser.user.role_id === 3;
        const entityEmailKey = isShelter ? 'email_shelter' : 'email_breeder';
        const entityIdKey = isShelter ? 'cif' : 'certification';

        const formValue = this.registerFormShelter.value;
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


          this.registerFormShelter.reset();
      },
      error: (err: any) => {
        console.error('Error registering user or entity:', err);
      }
    });
  } */






/*

  getErrorNameMessage(): any {
    if (this.name.hasError('required')) {
      return 'Campo obligatorio'
    }
  }
  getErrorAddressMessage(): any {
    if (this.address.hasError('required')) {
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
    if (this.location.hasError('required')) {
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
  } */

/*   getErrorCertificationMessage(): any {
    if (this.certification.hasError('required')) {
      return 'Campo Obligatorio'
    }
  } */

  /* getErrorDescriptionMessage(): any {
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
    } */
  /*   if (this.role_id.value === 4 && this.email_breeder.hasError('required')) {
      return 'Campo obligatorio';
    }
    if (this.role_id.value === 4 && this.email_breeder.hasError('pattern')) {
      return 'El formato del email no es válido';
    } */
    /* if (this.role_id.value !== 3 && this.role_id.value !== 4 && this.email.hasError('required')) {
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
  } */
}
