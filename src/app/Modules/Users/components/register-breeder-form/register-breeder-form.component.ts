import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-breeder-form',
  templateUrl: './register-breeder-form.component.html',
  styleUrls: ['./register-breeder-form.component.scss']
})
export class RegisterBreederFormComponent {
  @Output() formReady = new EventEmitter<FormGroup>();
  @Output() filesChanged = new EventEmitter<{ [key: string]: File | null }>();

  formBreeder!: FormGroup;

  selectedFiles: { [key: string]: File | null } = {};
  imagePreviews: { [key: string]: string | null } = {};

constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formBreeder = this.formBuilder.group({
      name: ['', Validators.required],
      certification: ['', [Validators.required]],
      email_breeder: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+34|0034|34)?[6|7|9][0-9]{8}$/)]],
      address: ['', Validators.required],
      location: ['', Validators.required],
      logo_url: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]]
    });

    this.formReady.emit(this.formBreeder);
  }

onImageSelected(event: Event, field: string): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    this.selectedFiles[field] = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreviews[field] = reader.result as string;
    };
    reader.readAsDataURL(file);

    this.filesChanged.emit(this.selectedFiles);
  }
}

  get name() {
    return this.formBreeder.get('name');
  }

  get certification() {
    return this.formBreeder.get('certification');
  }

  get email_breeder() {
    return this.formBreeder.get('email_breeder');
  }

  get phone() {
    return this.formBreeder.get('phone');
  }

  get address() {
    return this.formBreeder.get('address');
  }

  get location() {
    return this.formBreeder.get('location');
  }

  get logo_url() {
    return this.formBreeder.get('logo_url');
  }

  get description() {
    return this.formBreeder.get('description');
  }

  getErrorMessage(controlName: string): string {
    const control = this.formBreeder.get(controlName);
    if (control?.hasError('required')) return 'Campo obligatorio';
    if (controlName === 'email_breeder' && control?.hasError('email')) return 'Email no válido';
    if (controlName === 'phone' && control?.hasError('pattern')) return 'Teléfono no válido';
    if (controlName === 'description' && control?.hasError('maxlength')) return 'Máximo 300 caracteres';
    return '';
  }
}
