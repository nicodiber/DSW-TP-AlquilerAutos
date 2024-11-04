import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerEliminarComponent } from './alquiler-eliminar.component';

describe('AlquilerEliminarComponent', () => {
  let component: AlquilerEliminarComponent;
  let fixture: ComponentFixture<AlquilerEliminarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlquilerEliminarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerEliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
