import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalUserApplicationsComponent } from './animal-user-applications.component';

describe('AnimalUserApplicationsComponent', () => {
  let component: AnimalUserApplicationsComponent;
  let fixture: ComponentFixture<AnimalUserApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalUserApplicationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalUserApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
