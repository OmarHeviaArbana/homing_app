import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-shelter-form',
  templateUrl: './register-shelter-form.component.html',
  styleUrls: ['./register-shelter-form.component.scss']
})
export class RegisterShelterFormComponent implements OnInit {
  @Output() formReady = new EventEmitter<FormGroup>();


  formShelter!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formShelter = this.formBuilder.group({
      name: ['', Validators.required],
      cif: ['', [Validators.required, Validators.pattern(/^[A-HJ-NP-SUVW][0-9]{7}[0-9A-J]$/i)]],
      email_shelter: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^(\+34|0034|34)?[6|7|9][0-9]{8}$/)]],
      address: ['', Validators.required],
      location: ['', Validators.required],
      logo_url: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(300)]]
    });

    this.formReady.emit(this.formShelter);
  }

  get name() {
    return this.formShelter.get('name');
  }

  get cif() {
    return this.formShelter.get('cif');
  }

  get email_shelter() {
    return this.formShelter.get('email_shelter');
  }

  get phone() {
    return this.formShelter.get('phone');
  }

  get address() {
    return this.formShelter.get('address');
  }

  get location() {
    return this.formShelter.get('location');
  }

  get logo_url() {
    return this.formShelter.get('logo_url');
  }

  get description() {
    return this.formShelter.get('description');
  }

  getErrorMessage(controlName: string): string {
    const control = this.formShelter.get(controlName);
    if (control?.hasError('required')) return 'Campo obligatorio';
    if (controlName === 'email_shelter' && control?.hasError('email')) return 'Email no válido';
    if (controlName === 'phone' && control?.hasError('pattern')) return 'Teléfono no válido';
    if (controlName === 'description' && control?.hasError('maxlength')) return 'Máximo 300 caracteres';
    if (controlName === 'cif' && control?.hasError('pattern')) return 'CIF no valido';
    return '';
  }

  imagePreviews: { [key: string]: string | null } = {
    logo_url: null,

  };

  onImageSelected(event: Event, field: string): void {
  const input = event.target as HTMLInputElement;

  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreviews[field] = reader.result as string;

      // Opcional: guardar en el form
    /*  this.formPublicAnimal.get(field)?.setValue(this.imagePreviews[field]); */
    };

      reader.readAsDataURL(file); // base64 para preview inmediato
    }
  }
}
