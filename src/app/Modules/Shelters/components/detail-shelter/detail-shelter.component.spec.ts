import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailShelterComponent } from './detail-shelter.component';

describe('DetailShelterComponent', () => {
  let component: DetailShelterComponent;
  let fixture: ComponentFixture<DetailShelterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailShelterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailShelterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
