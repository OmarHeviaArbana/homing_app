import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBreederComponent } from './detail-breeder.component';

describe('DetailBreederComponent', () => {
  let component: DetailBreederComponent;
  let fixture: ComponentFixture<DetailBreederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailBreederComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
