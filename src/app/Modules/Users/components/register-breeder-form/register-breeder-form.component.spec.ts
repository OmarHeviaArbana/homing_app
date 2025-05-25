import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBreederFormComponent } from './register-breeder-form.component';

describe('RegisterBreederFormComponent', () => {
  let component: RegisterBreederFormComponent;
  let fixture: ComponentFixture<RegisterBreederFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterBreederFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterBreederFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
