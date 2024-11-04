import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalListarComponent } from './sucursal-listar.component';

describe('SucursalListarComponent', () => {
  let component: SucursalListarComponent;
  let fixture: ComponentFixture<SucursalListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucursalListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
