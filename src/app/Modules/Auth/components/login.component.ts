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
import { AuthDTO } from '../models/auth.dto';
import { Observable } from 'rxjs';

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
    private store: Store<AppState>
  ) {

    this.email = new FormControl('', [
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
    ]);

    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]);

    this.loginForm = this.formBuilder.group({
      email: this.email,
      password: this.password,
    });

    this.loading$ = this.store.select((state) => state.auth.loading);
    this.loaded$ = this.store.select((state) => state.auth.loaded);
  }

  ngOnInit(): void {}

  login(): void {
    const credentials: AuthDTO = {
      email: this.email.value,
      password: this.password.value,
      user_id: '',
      access_token: '',
    };

   this.store.dispatch(AuthAction.login({ credentials }));


  }

  getErrorEmailMessage(): any {
    if (this.email.hasError('required')) {
      return 'Email is required'
    }
    if (this.email.hasError('pattern') && !this.email.hasError('required')) {
      return 'Email not a valid format.'
    }
  }

  getErrorPasswordMessage(): any {
    if (this.password.hasError('required')) {
      return 'Password is required'
    }
    if (this.password.hasError('minlength') && !this.password.hasError('maxlength') && !this.password.hasError('required')) {
      return 'Password must be greater tha 8 characters.'
    }
    if (this.password.hasError('maxlength') && !this.password.hasError('minlength') && !this.password.hasError('required')) {
      return 'Password can be max 16 characters long.'
    }
  }
}
