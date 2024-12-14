import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCrearComponent } from './mantenimiento-crear.component';

describe('MantenimientoCrearComponent', () => {
  let component: MantenimientoCrearComponent;
  let fixture: ComponentFixture<MantenimientoCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MantenimientoCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MantenimientoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
