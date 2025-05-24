import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrls: ['./register-user-form.component.scss']
})
export class RegisterUserFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() roleSelected = new EventEmitter<number>();


  formUser!: FormGroup;

  rolUserList = [
    { id: 2, name: 'Adoptante' },
    { id: 3, name: 'Refugio' },
    { id: 4, name: 'Criadero' },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      role_id: ['', Validators.required],
    });

    this.formReady.emit(this.formUser);
     this.formUser.get('role_id')?.valueChanges.subscribe((roleId: number) => {
      this.roleSelected.emit(roleId);
    });
  }

  get name() {
    return this.formUser.get('name');
  }

  get username() {
    return this.formUser.get('username');
  }

  get email() {
    return this.formUser.get('email');
  }

  get password() {
    return this.formUser.get('password');
  }

  get role_id() {
    return this.formUser.get('role_id');
  }

  getErrorMessage(controlName: string): string {
    const control = this.formUser.get(controlName);
    if (control?.hasError('required')) return 'Campo obligatorio';
    if (controlName === 'email' && control?.hasError('email') ) return 'Email no válido';
    if (controlName === 'password' && control?.hasError('minlength')) return 'Debe tener mínimo 8 caracteres';
    return '';
  }
}
