import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidenteCrearComponent } from './incidente-crear.component';

describe('IncidenteCrearComponent', () => {
  let component: IncidenteCrearComponent;
  let fixture: ComponentFixture<IncidenteCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidenteCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidenteCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
