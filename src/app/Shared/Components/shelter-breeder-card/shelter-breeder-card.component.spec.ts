import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelterBreederCardComponent } from './shelter-breeder-card.component';

describe('ShelterBreederCardComponent', () => {
  let component: ShelterBreederCardComponent;
  let fixture: ComponentFixture<ShelterBreederCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShelterBreederCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShelterBreederCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
