import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AuthAction from '../actions';
import { Observable } from 'rxjs';
import { LoginDTO } from '../models/login.dto';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  loginForm: FormGroup;

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  ngOnInit(): void {

  }

  login(): void {
    const credentials: LoginDTO = {
      email: this.email.value,
      password: this.password.value,
    };

   this.store.dispatch(AuthAction.login({ credentials }));
  }

  cancel(): void {
    this.router.navigateByUrl('/');
  }

  getErrorEmailMessage(): any {
    if (this.email.hasError('required')) {
       return 'Campo obligatorio'
    }
    if (this.email.hasError('pattern') && !this.email.hasError('required')) {
      return 'El formato del email no es válido'
    }
  }

  getErrorPasswordMessage(): any {
    if (this.password.hasError('required')) {
      return 'Campo obligatorio'
    }
    if (this.password.hasError('minlength') && !this.password.hasError('maxlength') && !this.password.hasError('required')) {
      return 'La contraseña debe tener al menos 8 caracteres'
    }
  }
}
