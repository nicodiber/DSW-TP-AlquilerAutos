import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucursalCrearComponent } from './sucursal-crear.component';

describe('SucursalCrearComponent', () => {
  let component: SucursalCrearComponent;
  let fixture: ComponentFixture<SucursalCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucursalCrearComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SucursalCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
