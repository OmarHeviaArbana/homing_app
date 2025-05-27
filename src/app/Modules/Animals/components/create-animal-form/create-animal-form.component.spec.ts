import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAnimalFormComponent } from './create-animal-form.component';

describe('CreateAnimalFormComponent', () => {
  let component: CreateAnimalFormComponent;
  let fixture: ComponentFixture<CreateAnimalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAnimalFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAnimalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
