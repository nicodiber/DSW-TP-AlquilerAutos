import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesUsuarioComponent } from './incidentes-usuario.component';

describe('IncidentesUsuarioComponent', () => {
  let component: IncidentesUsuarioComponent;
  let fixture: ComponentFixture<IncidentesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IncidentesUsuarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
