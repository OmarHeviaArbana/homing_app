import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-animal-form',
  templateUrl: './create-animal-form.component.html',
  styleUrls: ['./create-animal-form.component.scss']
})
export class CreateAnimalFormComponent {
   @Output() formReady = new EventEmitter<FormGroup>();


    formPublicAnimal!: FormGroup;

    rolUserList = [
      { id: 2, name: 'Adoptante' },
      { id: 3, name: 'Refugio' },
      { id: 4, name: 'Criadero' },
    ];

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.formPublicAnimal = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        location: ['', Validators.required],
        weight: ['', Validators.required],
        height: ['', Validators.required],
        species_id: ['', Validators.required],
        status_id: ['', Validators.required],
        agecategory_id: ['', Validators.required],
        genre_id: ['', Validators.required],
        size_id: ['', Validators.required],
        energylevel_id: ['', Validators.required],
        identifier: ['', Validators.required],
        vaccines: ['', Validators.required],
        sterelization: ['', Validators.required],
        care: ['', Validators.required],
      });

      this.formReady.emit(this.formPublicAnimal);
      /*  this.formPublicAnimal.get('role_id')?.valueChanges.subscribe((roleId: number) => {
        this.roleSelected.emit(roleId);
      }); */
    }

    get name() {
      return this.formPublicAnimal.get('name');
    }

    get description() {
      return this.formPublicAnimal.get('description');
    }
    get location() {
      return this.formPublicAnimal.get('location');
    }
    get weight() {
      return this.formPublicAnimal.get('weight');
    }
    get height() {
      return this.formPublicAnimal.get('height');
    }
    get species_id() {
      return this.formPublicAnimal.get('species_id');
    }
    get status_id() {
      return this.formPublicAnimal.get('status_id');
    }
    get agecategory_id() {
      return this.formPublicAnimal.get('agecategory_id');
    }
    get genre_id() {
      return this.formPublicAnimal.get('genre_id');
    }
    get size_id() {
      return this.formPublicAnimal.get('size_id');
    }
    get energylevel_id() {
      return this.formPublicAnimal.get('energylevel_id');
    }
    get identifier() {
      return this.formPublicAnimal.get('identifier');
    }
    get vaccines() {
      return this.formPublicAnimal.get('vaccines');
    }
    get sterelization() {
      return this.formPublicAnimal.get('sterelization');
    }
    get care() {
      return this.formPublicAnimal.get('care');
    }


    getErrorMessage(controlName: string): string {
      const control = this.formPublicAnimal.get(controlName);
      if (control?.hasError('required')) return 'Campo obligatorio';
      return '';
    }

}
