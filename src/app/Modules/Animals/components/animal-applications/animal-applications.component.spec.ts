import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalApplicationsComponent } from './animal-applications.component';

describe('AnimalApplicationsComponent', () => {
  let component: AnimalApplicationsComponent;
  let fixture: ComponentFixture<AnimalApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
