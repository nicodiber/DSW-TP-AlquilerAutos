import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModeloComponent } from './crearModelo.component';

describe('CrearConductorComponent', () => {
  let component: CrearModeloComponent;
  let fixture: ComponentFixture<CrearModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearModeloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
