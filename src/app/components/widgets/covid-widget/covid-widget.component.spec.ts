import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidWidgetComponent } from './covid-widget.component';

describe('CovidWidgetComponent', () => {
  let component: CovidWidgetComponent;
  let fixture: ComponentFixture<CovidWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovidWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
