import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterShelterFormComponent } from './register-shelter-form.component';

describe('RegisterShelterFormComponent', () => {
  let component: RegisterShelterFormComponent;
  let fixture: ComponentFixture<RegisterShelterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterShelterFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterShelterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
