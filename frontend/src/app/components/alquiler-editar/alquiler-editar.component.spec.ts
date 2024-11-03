import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerEditarComponent } from './alquiler-editar.component';

describe('AlquilerEditarComponent', () => {
  let component: AlquilerEditarComponent;
  let fixture: ComponentFixture<AlquilerEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlquilerEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
