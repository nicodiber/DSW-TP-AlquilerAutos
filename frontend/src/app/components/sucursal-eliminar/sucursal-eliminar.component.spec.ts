import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalEliminarComponent } from './sucursal-eliminar.component';

describe('SucursalEliminarComponent', () => {
  let component: SucursalEliminarComponent;
  let fixture: ComponentFixture<SucursalEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
