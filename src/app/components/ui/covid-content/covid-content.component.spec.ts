import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidContentComponent } from './covid-content.component';

describe('CovidContentComponent', () => {
  let component: CovidContentComponent;
  let fixture: ComponentFixture<CovidContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
