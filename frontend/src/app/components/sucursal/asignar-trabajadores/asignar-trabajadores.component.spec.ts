import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarTrabajadoresComponent } from './asignar-trabajadores.component';

describe('AsignarTrabajadoresComponent', () => {
  let component: AsignarTrabajadoresComponent;
  let fixture: ComponentFixture<AsignarTrabajadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarTrabajadoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignarTrabajadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
