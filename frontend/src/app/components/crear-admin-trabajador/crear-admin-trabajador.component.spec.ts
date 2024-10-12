import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAdminTrabajadorComponent } from './crear-admin-trabajador.component';

describe('CrearAdminTrabajadorComponent', () => {
  let component: CrearAdminTrabajadorComponent;
  let fixture: ComponentFixture<CrearAdminTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrearAdminTrabajadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAdminTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
