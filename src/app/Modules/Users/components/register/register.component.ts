import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as UserAction from '../../actions';
import { UserDTO } from './../../models/user.dto';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ShelterDTO } from 'src/app/Modules/Shelters/models/shelter.dto';
import { BreederDTO } from 'src/app/Modules/Breeders/models/breeder.dto';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerUser: UserDTO;
  registerShelter: ShelterDTO;
  registerBreeder: BreederDTO;

  name: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  role_id: FormControl;

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
  isValidForm: boolean | null;

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
    this.isValidForm = null;

    this.name = new FormControl(this.registerUser.name, [
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
    ]);

    this.cif = new FormControl(this.registerShelter.cif, [

      Validators.required,
      Validators.pattern('/^[ABEH][0-9]{8}$/'),
      Validators.pattern('/^[KPQS][0-9]{7}[A-J]$/'),
      Validators.pattern('/^[CDFGJLMNRUVW][0-9]{7}[0-9A-J]$/'),
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
    /*   logo_url: this.logo_url,
      address: this.address,
      location: this.location,
      description: this.description,
      phone: this.phone,
      email_shelter: this.email_shelter,
      email_breeder: this.email_breeder,
      cif: this.cif,
      certification: this.certification */
  });

  this.registerFormShelterBreeder = this.formBuilder.group({
  /*     name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      role_id: this.role_id, */
      logo_url: this.logo_url,
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

  ngOnInit(): void {}


  register(): void {
    this.isValidForm = false;

    if (this.registerFormUser.invalid || this.registerFormShelterBreeder.invalid  ) {
      return;
    }

    this.isValidForm = true;

    const user = {
      name: this.registerFormUser.value.name,
      username: this.registerFormUser.value.username,
      email: this.registerFormUser.value.email,
      password: this.registerFormUser.value.password,
      role_id: this.registerFormUser.value.role_id
    };

   this.store.dispatch(UserAction.register({ user }));

   this.store.select('user').subscribe({
     next: (user: any) => {
      if (user.rol_id === 2) {
        this.router.navigate(['/login']);
        return;
      }

      const shelterOrBreeder = {
        user_id: user.id,
        name: this.registerFormShelterBreeder.value.name,
        logo_url: this.registerFormShelterBreeder.value.logo_url,
        address: this.registerFormShelterBreeder.value.address,
        location: this.registerFormShelterBreeder.value.location,
        description: this.registerFormShelterBreeder.value.description,
        phone: this.registerFormShelterBreeder.value.phone,
        [`email_${user.role_id == 3 ? 'shelter' : 'breeder'}`]: this.registerFormShelterBreeder.value.email[`_${user.role_id == 3 ? 'shelter' : 'breeder'}`],
        [user.role_id === 3 ? 'cif' : 'certification']:  [user.role_id === 3 ? this.registerFormShelterBreeder.value.cif  : this.registerFormShelterBreeder.value.certification ]

      };

        if (user.role_id=== 3) {
          console.log("Shelter");
          console.log(shelterOrBreeder);



        } else {
            console.log("Breeder");
            console.log(shelterOrBreeder);

        }
      },
      error: (err: any) => {
        console.error('Error registrando usuario o entidad:', err);
      }
    });
  }


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
    if (this.email.hasError('required')) {
      return 'Campo obligatorio'
    }
    if (this.email.hasError('pattern') && !this.email.hasError('required')) {
      return 'El formato del email no es válido'
    }
    if (this.email_shelter.hasError('required')) {
      return 'Campo obligatorio'
    }
    if (this.email_shelter.hasError('pattern') && !this.email_shelter.hasError('required')) {
      return 'El formato del email no es válido'
    }
    if (this.email_breeder.hasError('required')) {
      return 'Campo obligatorio'
    }
    if (this.email_breeder.hasError('pattern') && !this.email_breeder.hasError('required')) {
      return 'El formato del email no es válido'
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
