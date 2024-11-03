import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerListarComponent } from './alquiler-listar.component';

describe('AlquilerListarComponent', () => {
  let component: AlquilerListarComponent;
  let fixture: ComponentFixture<AlquilerListarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlquilerListarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
