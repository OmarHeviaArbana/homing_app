import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalDataTableComponent } from './animal-data-table.component';

describe('AnimalDataTableComponent', () => {
  let component: AnimalDataTableComponent;
  let fixture: ComponentFixture<AnimalDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnimalDataTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimalDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
