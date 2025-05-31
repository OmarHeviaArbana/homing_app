import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataBreederShelterCardComponent } from './data-breeder-shelter-card.component';

describe('DataBreederShelterCardComponent', () => {
  let component: DataBreederShelterCardComponent;
  let fixture: ComponentFixture<DataBreederShelterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataBreederShelterCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataBreederShelterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
