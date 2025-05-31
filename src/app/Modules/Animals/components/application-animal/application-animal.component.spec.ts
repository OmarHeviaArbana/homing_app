import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationAnimalComponent } from './application-animal.component';

describe('ApplicationAnimalComponent', () => {
  let component: ApplicationAnimalComponent;
  let fixture: ComponentFixture<ApplicationAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationAnimalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
